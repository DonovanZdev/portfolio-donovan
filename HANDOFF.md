# Handoff — Estado al 2026-09-18

## En una línea

Proyecto personal de Donovan Zuñiga (desarrollador y dueño del sitio): su portafolio web sobre el template Portfolio de Magic UI, para publicarlo en Cloudflare Workers. Contenido de Donovan ya cargado (hero, sobre mí, stack, 5 casos, contacto y 5 artículos en español); compila como export estático (18 páginas, probado con `wrangler dev` en escritorio y celular). Desplegado en https://portfolio-donovan.pages.dev.

## Qué se hizo recientemente

- Bootstrap del proyecto desde el template del skill `new-project` (commit `28c322a`).
- Repo público creado y primer push a `main` hecho; secret `ZAI_API_KEY` puesto y bot de auto-handoff verificado (✅ en el log).
- Decisión de hosting: Cloudflare **Workers con Static Assets** (no Pages). Se probó vinext y se descartó: `/blog/[slug]` daba 500 en Workers por `useMDXComponent` (usa `new Function`); ver `TRAMPAS.md`. Cuenta de Cloudflare con login en `wrangler` (una sola cuenta).
- Template `dillionverma/portfolio@5ef12e4` importado (commit `6500c12`) con Next 16.2.12 y React 19.2.8 (parches de seguridad de mayo 2026).
- Sitio convertido a export estático: `output: "export"`, headers en `public/_headers`, paginación del blog por ruta (`/blog/page/N`), imágenes OG estáticas con fuentes leídas de disco, `wrangler.jsonc` solo con `assets` (`./out`). Verificado: build con 0, 3 y 7 posts, `wrangler dev` con todas las rutas en 200, `tsc` y `eslint` limpios.

- Contenido de Donovan cargado: foto (recorte sin EXIF), textos en español, cifras del PDF, stack, 5 casos con enlace a su artículo, contacto por WhatsApp y correo. Blog: 7 posts de ejemplo reemplazados por 5 artículos (borradores hechos solo con lo que dice el PDF). Se quitaron Work, Education y Hackathons (el PDF no trae esos datos). Imágenes OG con avatar embebido.

## Trabajo en progreso (sin commitear)

Nada.

## Lo que sigue

1. **Revisar los 5 artículos** de `content/` (son borradores): ajustar tono y agregar detalles que solo Donovan conoce. Ninguno lleva datos de clientes; mantenerlo así (repo público).
2. Opcional: dominio propio (entonces actualizar `DATA.url` en `src/data/resume.tsx` y redesplegar con `pnpm run deploy`).
3. Agregar experiencia/estudios si Donovan quiere esas secciones, y capturas **anonimizadas** de los casos (las del PDF traen nombres de clientes y montos reales).

### Notas vivas

- Repo público: `DonovanZdev/portfolio-donovan`.
- El bot pega commits crudos en "Qué se hizo recientemente" (con `<code>`, trailers `Co-Authored-By` y encabezados huérfanos): revisar y limpiar a mano tras cada push.
- `Portafolio-Automatizaciones-Donovan.pdf` vive solo en local (ignorado por git).
- pnpm 12.4.2 instalado con `npm i -g pnpm` el 2026-09-18; el template trae `pnpm-lock.yaml`. Scripts: `pnpm build`, `pnpm preview` (build + `wrangler pages dev`), `pnpm run deploy` (con `run`: `pnpm deploy` es otro comando y falla).
- Dominio propio: opcional; hoy el sitio vive en `pages.dev` (en Workers la URL habría llevado el subdominio de la cuenta, `donovanadrianpro`; ver `TRAMPAS.md`).
- **Origen del contenido de los artículos:** cifras, stack, nombres de los casos y sus pasos salen del PDF. Es interpretación mía (validar con Donovan): el hilo narrativo y las frases de contexto (ej. "cuadrar caja suele significar cruzar hojas de cálculo"), los pasos del recordatorio diario (inferidos de los nombres de nodos del diagrama), la idea de "tres piezas del mismo proceso" (en el PDF son tres pies de foto) y la descripción del cotizador. `publishedAt` de los 5 es la fecha de creación (2026-09-18), no de redacción real.
- Contacto público (decidido por Donovan): correo de Gmail y WhatsApp, definidos en `src/data/resume.tsx`. No hay GitHub/LinkedIn en el sitio.
- Sitio en vivo: https://portfolio-donovan.pages.dev (proyecto Pages `portfolio-donovan`). Desplegar: `pnpm run deploy`. El Worker viejo de `workers.dev` ya fue borrado por Donovan (verificado el 2026-09-18).
- La foto original (con EXIF) está solo en `_privado/foto-original.jpeg`, ignorada por git.

## Cómo retomar en otra cuenta/máquina

1. `git clone` del repo y abrir la carpeta en Claude Code.
2. Correr `/resume`.
