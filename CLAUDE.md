# portfolio-donovan

Portafolio web personal de Donovan Zuñiga (automatización de procesos y sistemas a la medida), publicado en Cloudflare. Muestra experiencia, proyectos y casos de automatización (n8n, dashboards, cobranza, ventas) a posibles clientes y empleadores.

## Contexto

- **Quién es quién:** proyecto personal de Donovan (desarrollador) y a la vez su propio "cliente". No es parte del ecosistema Nexai (no comparte PocketBase/n8n/Gotenberg ni usa subdominio `nexai.mx`).
- **Base visual:** template "Portfolio" de Magic UI (`github.com/dillionverma/portfolio`, licencia MIT). Secciones: Hero, About, Work, Education, Projects, Hackathons, Contact y Blog (MDX).
- **Contenido:** todo en español (México). Datos del sitio y de los casos en `src/data/resume.tsx`; artículos en `content/*.mdx` (borradores redactados a partir del PDF, sin cifras ni herramientas que el PDF no mencione; Donovan debe revisarlos). La foto original está en `_privado/foto-original.jpeg` (tiene EXIF); el sitio usa `public/me.jpg` (recorte sin EXIF).
- **Fuente de contenido:** `Portafolio-Automatizaciones-Donovan.pdf` en la raíz (solo local, ignorado por git). Resume casos reales: dashboards en tiempo real, ventas→pagos, cotización→cobranza y flujos de muchas ramas; cifras: 150+ workflows en producción, 3 servidores propios, 8+ empresas atendidas.
- **Restricción clave:** el repo es **público** y el PDF trae capturas con datos reales de clientes (nombres de empresas, folios, montos). Nada de eso se publica tal cual en el sitio.
- **Despliegue:** cuenta propia de Cloudflare, primero en `*.workers.dev`; el dominio propio se conecta después.

## Stack

- **Base:** Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui + Magic UI + `motion`. Blog con `content-collections` (MDX en `content/`). El template trae `pnpm-lock.yaml`.
- **Hosting:** Cloudflare **Workers con Static Assets** (no Pages; Cloudflare lo recomienda para Next.js y deja Pages para exports estáticos). El sitio es un **export estático** (`output: "export"`): `next build` genera `./out` y `wrangler deploy` lo sube (`wrangler.jsonc`, solo `assets`, sin código de servidor). Los headers de seguridad y el `Content-Type` de las imágenes OG viven en `public/_headers`.
- **Por qué no vinext:** se probó `vinext` (beta; la doc oficial de Cloudflare lo recomienda para Next.js en modo servidor) y el build funciona, pero `/blog/[slug]` falla en Workers porque `useMDXComponent` usa `new Function` (ver `TRAMPAS.md`). Un portafolio es casi todo estático, así que el export es más simple, más rápido y sin dependencia beta. Si algún día hace falta servidor, retomar vinext u OpenNext.
- **Scripts:** `pnpm dev` (desarrollo), `pnpm build` (genera `./out`), `pnpm preview` (build + `wrangler dev` local en :8787), `pnpm deploy` (build + `wrangler deploy`).
- **Seguridad:** el template fija `next 16.1.1`. Cloudflare avisó (2026-05-06) de vulnerabilidades corregidas en Next `16.2.5` y React `19.2.6`. Ya subido a Next `16.2.12` y React `19.2.8` (fijo, sin `^`).

## Reglas

1. **No hardcodear secretos.** Nada de API keys, tokens ni credenciales en el repo ni en los docs.
2. **Confidencialidad.** Repo público: no subir datos reales de clientes. Las capturas, PDFs y material con nombres de empresas, folios o montos van en `_privado/` (ignorado por git). En el sitio, usar capturas anonimizadas o datos inventados.
3. **Contenido primero, adornos después.** Antes de tocar diseño, reemplazar todo el contenido de ejemplo del template (nombre, bio, proyectos, redes) con el de Donovan. No dejar rastro de "Dillion Verma".
4. **Conservar la licencia MIT y el aviso de copyright del template** (`LICENSE`) al reutilizar su código.
5. **Verificar en build real:** cada cambio que toque configuración de Cloudflare o Next se prueba con `build` antes de commitear.

## Estado actual

Fase: **contenido cargado, listo para desplegar**. El sitio ya tiene el contenido de Donovan (hero con foto, sobre mí con cifras, stack, 5 casos, contacto por WhatsApp y correo) y un blog con 5 artículos en español, uno por caso. Compila como export estático (18 páginas), verificado con `wrangler dev` en escritorio y celular. **Sin desplegar todavía.** Se quitaron las secciones Work, Education y Hackathons porque el PDF no trae esos datos: agregarlas cuando Donovan los dé (había un `WorkSection`/`HackathonsSection` en el template; recuperables con `git show 6500c12:src/components/section/work-section.tsx`).

## Docs

- `HANDOFF.md` — estado vivo (chico). El bot `auto-handoff` mantiene "En una línea" y "Qué se hizo recientemente"; lo demás lo edita `/handoff` a mano.
- `TRAMPAS.md` — reglas que no deben volver a romperse. **Append-only.** `/resume` no lo lee por default: `grep -n "<keyword>" TRAMPAS.md` si la tarea toca ese dominio.

## Continuidad entre sesiones

Skills globales (`~/.claude/skills`): `/handoff` al cerrar sesión, `/resume` al abrir una nueva. El bot `auto-handoff` (GitHub Actions + Z.AI GLM-4.7-Flash, gratis) actualiza `HANDOFF.md` en cada push a `main` que toque código; requiere el secret `ZAI_API_KEY` del repo.
