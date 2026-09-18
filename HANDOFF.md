# Handoff — Estado al 2026-09-18

## En una línea

Proyecto personal de Donovan Zuñiga: portafolio web sobre el template Portfolio de Magic UI, para publicarlo en Cloudflare Workers. Contenido de Donovan ya cargado (hero, sobre mí, stack, 5 casos, contacto y 5 artículos en español); compila como export estático (18 páginas, probado con `wrangler dev` en escritorio y celular). Falta el primer deploy.

## Qué se hizo recientemente

- Bootstrap del proyecto desde el template del skill `new-project` (commit `28c322a`).
- Repo público creado y primer push a `main` hecho; secret `ZAI_API_KEY` puesto y bot de auto-handoff verificado (✅ en el log).
- Decisión de hosting: Cloudflare **Workers con Static Assets** (no Pages). Se probó vinext y se descartó: `/blog/[slug]` daba 500 en Workers por `useMDXComponent` (usa `new Function`); ver `TRAMPAS.md`. Cuenta de Cloudflare con login en `wrangler` (una sola cuenta).
- Template `dillionverma/portfolio@5ef12e4` importado (commit `6500c12`) con Next 16.2.12 y React 19.2.8 (parches de seguridad de mayo 2026).
- Sitio convertido a export estático: `output: "export"`, headers en `public/_headers`, paginación del blog por ruta (`/blog/page/N`), imágenes OG estáticas con fuentes leídas de disco, `wrangler.jsonc` solo con `assets` (`./out`). Verificado: build con 0, 3 y 7 posts, `wrangler dev` con todas las rutas en 200, `tsc` y `eslint` limpios.
- Contenido de Donovan cargado: foto (recorte sin EXIF), textos en español, cifras del PDF, stack, 5 casos con enlace a su artículo, contacto por WhatsApp y correo. Blog: 7 posts de ejemplo reemplazados por 5 artículos (borradores hechos solo con lo que dice el PDF). Se quitaron Work, Education y Hackathons (el PDF no trae esos datos). Imágenes OG con avatar embebido.

- <code>841999a</code> docs: quitar commits crudos que pegó el bot en HANDOFF
- <code>6e76f66</code> feat: contenido de Donovan en español (casos, blog, contacto)
- Reemplaza el contenido de ejemplo del template por el de Donovan: foto, sobre mí con cifras, stack, 5 casos y contacto por WhatsApp y correo.
- Blog: 5 artículos (uno por caso) en lugar de los 7 de ejemplo.
- Quita Work, Education y Hackathons (el PDF no trae esos datos).
- UI en español; tarjetas de casos sin imagen; fechas es-MX.
- OG: el avatar se lee del disco en el build (sin depender de DATA.url).
- Docs: estado, pendientes y trampas nuevas.

## Trabajo en progreso (sin commitear)

Nada.

## Lo que sigue

1. **Revisar los 5 artículos** de `content/` (son borradores): ajustar tono y agregar detalles que solo Donovan conoce. Ninguno lleva datos de clientes; mantenerlo así (repo público).
2. Primer deploy: `pnpm deploy` (build + `wrangler deploy`). La primera vez Cloudflare pide registrar el subdominio `*.workers.dev` de la cuenta (nombre público, lo elige Donovan). Después poner la URL real en `DATA.url` de `src/data/resume.tsx` y volver a desplegar.
3. Agregar experiencia/estudios si Donovan quiere esas secciones, capturas **anonimizadas** de los casos y, más adelante, dominio propio.

### Notas vivas

- Repo público: `DonovanZdev/portfolio-donovan`.
- El bot pega commits crudos en "Qué se hizo recientemente" (con `<code>`, trailers `Co-Authored-By` y encabezados huérfanos): revisar y limpiar a mano tras cada push.
- `Portafolio-Automatizaciones-Donovan.pdf` vive solo en local (ignorado por git).
- pnpm 12.4.2 instalado con `npm i -g pnpm` el 2026-09-18; el template trae `pnpm-lock.yaml`. Scripts: `pnpm build`, `pnpm preview` (local en :8787), `pnpm deploy`.
- Dominio propio: pendiente, se conecta después del primer deploy en `*.workers.dev`.
- Contacto público (decidido por Donovan): correo de Gmail y WhatsApp, definidos en `src/data/resume.tsx`. No hay GitHub/LinkedIn en el sitio.
- `DATA.url` es un placeholder (`portfolio-donovan.workers.dev`): corregir tras el primer deploy.
- La foto original (con EXIF) está solo en `_privado/foto-original.jpeg`, ignorada por git.

## Cómo retomar en otra cuenta/máquina

1. `git clone` del repo y abrir la carpeta en Claude Code.
2. Correr `/resume`.
