// scripts/auto-handoff.mjs
//
// Lee los últimos commits desde el commit registrado en HANDOFF.md (o los
// últimos N si no encuentra match), pide a GLM-4.7-Flash (Z.AI, gratis)
// que redacte SOLO 2 bloques ("En una línea" + "Qué se hizo
// recientemente") y los empalma por código en el archivo, dejando todo
// lo demás byte-idéntico.
//
// Por qué empalmar por código y no pedirle el archivo completo: un
// modelo chico como GLM-4.7-Flash no sigue instrucciones de "no toques
// la sección X" con la misma confiabilidad que un modelo grande — en
// pruebas reescribió "Lo que sigue" a pesar de que el prompt se lo
// prohibía. Pedirle solo los 2 bloques que le corresponden y splicear
// el resto nosotros hace la violación estructuralmente imposible, sin
// depender de qué tan bien obedezca el modelo.
//
// CRÍTICO:
// - NO toca "Trampas conocidas" (eso vive en TRAMPAS.md, append-only).
// - NO toca "Lo que sigue" (eso lo decide el humano con /handoff).
// - NO toca "Trabajo en progreso", "Cómo retomar", ni ninguna otra
//   sección — literalmente no las recibe ni las devuelve.
//
// Si el script falla (API key faltante, network, shape inesperado,
// etc.), el workflow no commitea — el HANDOFF.md queda como estaba.
// NO rompe el deploy.

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const HANDOFF_PATH = 'HANDOFF.md';
const API_URL = 'https://api.z.ai/api/paas/v4/chat/completions';
const MODEL = 'glm-4.7-flash'; // gratis en la API de Z.AI, rate-limited (1000 req/día)
const MAX_OUTPUT_TOKENS = 2000;

const SECTION_UNA_LINEA = '## En una línea';
const SECTION_QUE_SE_HIZO = '## Qué se hizo recientemente';

// Devuelve { startIdx, endIdx, lines } — el rango [startIdx, endIdx) de
// líneas que forman la sección `header` (hasta el próximo "## " o EOF).
function findSectionBounds(markdown, header) {
  const lines = markdown.split('\n');
  const startIdx = lines.findIndex((l) => l.trim() === header);
  if (startIdx === -1) return null;
  let endIdx = lines.length;
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (lines[i].startsWith('## ')) {
      endIdx = i;
      break;
    }
  }
  return { startIdx, endIdx, lines };
}

function extractSection(markdown, header) {
  const bounds = findSectionBounds(markdown, header);
  if (!bounds) return null;
  return bounds.lines.slice(bounds.startIdx, bounds.endIdx).join('\n').trim();
}

// Reemplaza el bloque de `header` en `markdown` por `newBlock`, sin
// tocar ninguna otra línea del archivo.
function replaceSection(markdown, header, newBlock) {
  const bounds = findSectionBounds(markdown, header);
  if (!bounds) return null;
  const { startIdx, endIdx, lines } = bounds;
  const newLines = [
    ...lines.slice(0, startIdx),
    ...newBlock.trim().split('\n'),
    '',
    ...lines.slice(endIdx),
  ];
  return newLines.join('\n');
}

// Por si el modelo envuelve la respuesta en ```markdown ... ``` pese a
// que se le pide que no lo haga.
function stripCodeFences(text) {
  return text
    .trim()
    .replace(/^```[a-z]*\n/i, '')
    .replace(/\n```$/, '')
    .trim();
}

// 1. Validar API key
const apiKey = process.env.ZAI_API_KEY;
if (!apiKey) {
  console.error('❌ ZAI_API_KEY no está seteada. Skip silencioso.');
  process.exit(0); // exit 0 para no romper el workflow
}

// 2. Leer HANDOFF actual
let handoff;
try {
  handoff = readFileSync(HANDOFF_PATH, 'utf-8');
} catch (e) {
  console.error(`❌ No pude leer ${HANDOFF_PATH}:`, e.message);
  process.exit(0);
}

const currentUnaLinea = extractSection(handoff, SECTION_UNA_LINEA);
const currentQueSeHizo = extractSection(handoff, SECTION_QUE_SE_HIZO);
if (!currentUnaLinea || !currentQueSeHizo) {
  console.error('❌ No encontré las secciones esperadas en HANDOFF.md. Skip.');
  process.exit(0);
}

// 3. Detectar el commit anterior del bot (si lo hay) o usar 15 commits
let baseCommit;
try {
  baseCommit = execSync(
    "git log -n 1 --pretty=%H --grep='\\[skip handoff\\]' main",
    { encoding: 'utf-8' },
  ).trim();
} catch {
  baseCommit = '';
}

const gitLogRange = baseCommit ? `${baseCommit}..HEAD` : '-15';
const recentCommits = execSync(
  `git log ${gitLogRange} --pretty=format:"- %h %s%n%b" --reverse`,
  { encoding: 'utf-8' },
).trim();

if (!recentCommits) {
  console.log('ℹ️ No hay commits nuevos para procesar. Skip.');
  process.exit(0);
}

// Fallback al primer commit del repo si el HANDOFF actual no tiene
// un baseCommit válido (repos jóvenes con <15 commits hacían fallar
// `HEAD~15`). En un clone shallow `rev-list --max-parents=0` puede
// devolver varios SHAs (commits del borde aparecen como roots) → split
// y tomamos solo el primero para no romper la interpolación shell.
const diffBase =
  baseCommit ||
  execSync('git rev-list --max-parents=0 HEAD', { encoding: 'utf-8' })
    .trim()
    .split('\n')[0]
    .trim();

const changedFiles = execSync(
  `git diff --name-only ${diffBase}..HEAD`,
  { encoding: 'utf-8' },
).trim();

// 4. Construir prompt — SOLO pedimos los 2 bloques, nada más.
const systemPrompt = `Mantienes 2 bloques de un HANDOFF.md de un proyecto de software: "En una línea" (resumen del estado actual, 3-5 líneas) y "Qué se hizo recientemente" (lista de bullets por commit/feature, más recientes al final).

REGLAS:
1. Devuelves EXACTAMENTE 2 bloques, cada uno empieza con su encabezado "## " tal cual (no agregues ni quites encabezados).
2. NO agregues nada más: ni code fences, ni comentarios, ni otras secciones.
3. "Qué se hizo recientemente": agrega los commits nuevos al final de la lista existente, agrupados por feature si son varios commits relacionados. Cada bullet lleva el hash corto en code span al inicio. Conciso: 1-3 líneas por bullet.
4. "En una línea": actualízalo SOLO si los commits nuevos cambiaron el foco del trabajo; si no, devuélvelo igual al actual.
5. Si la lista de "Qué se hizo recientemente" ya tiene más de ~15 entradas, comprime/resume las más viejas en 1-2 bullets para no crecer sin límite.
6. Español neutro de México (sin voseo argentino, sin castellano de España).

Formato exacto de salida (nada antes ni después):
## En una línea

<contenido>

## Qué se hizo recientemente

<contenido>`;

const userPrompt = `Bloque "En una línea" actual:

${currentUnaLinea}

Bloque "Qué se hizo recientemente" actual:

${currentQueSeHizo}

Commits nuevos desde el último auto-handoff (${baseCommit || 'inicio'}):

${recentCommits}

Archivos modificados en ese rango:

${changedFiles}

Devuélveme los 2 bloques actualizados siguiendo el formato exacto indicado.`;

// 5. Llamar API de Z.AI (formato OpenAI-compatible)
let response;
try {
  response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      // GLM-4.7-Flash trae "thinking mode" activado por default y gasta
      // el output_tokens budget en razonamiento antes de escribir la
      // respuesta final — lo desactivamos porque esta tarea (reescribir
      // 2 bloques de markdown siguiendo reglas fijas) no lo necesita.
      thinking: { type: 'disabled' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  });
} catch (e) {
  console.error('❌ Network error a Z.AI:', e.message);
  process.exit(0);
}

if (!response.ok) {
  const errText = await response.text().catch(() => '');
  console.error(`❌ Z.AI API error ${response.status}: ${errText}`);
  process.exit(0);
}

const data = await response.json();
const rawContent = data?.choices?.[0]?.message?.content?.trim();

if (!rawContent) {
  console.error('❌ Respuesta vacía de Z.AI.');
  process.exit(0);
}

const modelOutput = stripCodeFences(rawContent);

// 6. Extraer los 2 bloques de la respuesta del modelo
const newUnaLinea = extractSection(modelOutput, SECTION_UNA_LINEA);
const newQueSeHizo = extractSection(modelOutput, SECTION_QUE_SE_HIZO);

if (!newUnaLinea || !newQueSeHizo) {
  console.error('❌ La respuesta del modelo no trae los 2 bloques esperados. NO escribo el archivo.');
  console.error('--- Respuesta cruda ---');
  console.error(rawContent.slice(0, 2000));
  process.exit(0);
}

// 7. Empalmar por código — el resto del archivo (incluyendo "Lo que
// sigue") queda byte-idéntico porque nunca se lo mandamos al modelo.
let updatedHandoff = replaceSection(handoff, SECTION_UNA_LINEA, newUnaLinea);
updatedHandoff = replaceSection(updatedHandoff, SECTION_QUE_SE_HIZO, newQueSeHizo);

// 8. Sanity check: el resto del archivo (todo lo que no sean los 2
// bloques tocados) debe seguir presente e intacto.
const untouchedBefore = replaceSection(
  replaceSection(handoff, SECTION_UNA_LINEA, '## En una línea\nX'),
  SECTION_QUE_SE_HIZO,
  '## Qué se hizo recientemente\nX',
);
const untouchedAfter = replaceSection(
  replaceSection(updatedHandoff, SECTION_UNA_LINEA, '## En una línea\nX'),
  SECTION_QUE_SE_HIZO,
  '## Qué se hizo recientemente\nX',
);
if (untouchedBefore !== untouchedAfter) {
  console.error('❌ Sanity check falló: el splice tocó algo fuera de los 2 bloques esperados. NO escribo el archivo.');
  process.exit(0);
}

// 9. Escribir
writeFileSync(HANDOFF_PATH, updatedHandoff.trimEnd() + '\n', 'utf-8');

console.log(`✅ HANDOFF.md actualizado con ${data?.usage?.prompt_tokens ?? '?'} input tokens / ${data?.usage?.completion_tokens ?? '?'} output tokens (GLM-4.7-Flash, tier gratis).`);
