# Handoff — Estado al 2026-09-18

## En una línea

Proyecto personal de Donovan Zuñiga desplegado en Cloudflare Pages (https://portfolio-donovan.pages.dev) usando export estático de Next.js. Se probó Workers pero se cambió a Pages por restricción de subdominios; todo el contenido (hero, sobre mí, 5 casos, 5 artículos, contacto) está en español y verificado en escritorio y móvil.

## Qué se hizo recientemente

- Bootstrap del proyecto desde el template del skill `new-project` (commit `28c322a`).
- Repo público creado y primer push a `main` hecho; secret `ZAI_API_KEY` puesto y bot de auto-handoff verificado (✅ en el log).
- Decisión de hosting: Cloudflare **Pages con Static Assets** (no Workers). Se probó vinext y se descartó: `/blog/[slug]` daba 500 en Workers por `useMDXComponent` (usa `new Function`); ver `TRAMPAS.md`.
- Template `dillionverma/portfolio@5ef12e4` importado (commit `6500c12`) con Next 16.2.12 y React 19.2.8 (parches de seguridad de mayo 2026).
- Sitio convertido a export estático: `output: "export"`, headers en `public/_headers`, paginación del blog por ruta (`/blog/page/N`), imágenes OG estáticas con fuentes leídas de disco, `wrangler.jsonc` solo con `assets` (`./out`). Verificado: build con 0, 3 y 7 posts, `wrangler dev` con todas las rutas en 200, `tsc` y `eslint` limpios.
- Contenido de Donovan cargado: foto (recorte sin EXIF), textos en español, cifras del PDF, stack, 5 casos con enlace a su artículo, contacto por WhatsApp y correo. Blog: 7 posts de ejemplo reemplazados por 5 artículos (borradores hechos solo con lo que dice el PDF). Se quitaron Work, Education y Hackathons (el PDF no trae esos datos). Imágenes OG con avatar embebido.
- <code>1494355</code> docs: quitar commits crudos que pegó el bot en HANDOFF
- <code>9317000</code> feat: desplegar a Cloudflare Pages (portfolio-donovan.pages.dev). En Workers la URL lleva el subdominio de la cuenta (donovanadrianpro) y no se puede renombrar; Pages da una URL corta. wrangler.jsonc pasa a pages_build_output_dir y los scripts usan wrangler pages.

## Trabajo en progreso (sin commitear)

Nada.

## Lo que sigue

1. **Revisar los 5 artículos** de `content/` (son borradores): ajustar tono y agregar detalles que solo Donovan conoce. Ninguno lleva datos de clientes; mantenerlo así (repo público).
2. Apagar el Worker viejo (`npx wrangler delete --name portfolio-donovan`) cuando Donovan confirme la URL de Pages. Opcional: dominio propio (entonces actualizar `DATA.url` en `src/data/resume.tsx` y redesplegar).
3. Agregar experiencia/estudios si Donovan quiere esas secciones, capturas **anonimizadas** de los casos y, más adelante, dominio propio.

### Notas vivas

- Repo público: `DonovanZdev/portfolio-donovan`.
- El bot pega commits crudos en "Qué se hizo recientemente" (con `<code>`, trailers `Co-Authored-By` y encabezados huérfanos): revisar y limpiar a mano tras cada push.
- `Portafolio-Automatizaciones-Donovan.pdf` vive solo en local (ignorado por git).
- pnpm 12.4.2 instalado con `npm i -g pnpm` el 2026-09-18; el template trae `pnpm-lock.yaml`. Scripts: `pnpm build`, `pnpm preview` (local en :8787), `pnpm deploy`.
- Dominio propio: pendiente, se conecta después del primer deploy en `*.workers.dev`.
- Contacto público (decidido por Donovan): correo de Gmail y WhatsApp, definidos en `src/data/resume.tsx`. No hay GitHub/LinkedIn en el sitio.
- Sitio en vivo: https://portfolio-donovan.pages.dev (proyecto Pages `portfolio-donovan`). Desplegar: `pnpm run deploy`. Pendiente de apagar: el Worker viejo `portfolio-donovan` en `portfolio-donovan.donovanadrianpro.workers.dev` (esperando que Donovan confirme que la URL de Pages le sirve).
- La foto original (con EXIF) está solo en `_privado/foto-original.jpeg`, ignorada por git.

## Cómo retomar en otra cuenta/máquina

1. `git clone` del repo y abrir la carpeta en Claude Code.
2. Correr `/resume`.
