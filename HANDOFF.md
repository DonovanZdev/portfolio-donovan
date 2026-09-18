# Handoff — Estado al 2026-09-18

## En una línea

Proyecto personal de Donovan Zuñiga (desarrollador y dueño del sitio): su portafolio web sobre el template Portfolio de Magic UI, para publicarlo en Cloudflare Workers. Fase de arranque: template importado y compilando como export estático (22 páginas, probado con `wrangler dev`); todavía con el contenido de ejemplo de Dillion Verma y sin desplegar.

## Qué se hizo recientemente

- Bootstrap del proyecto desde el template del skill `new-project` (commit `28c322a`).
- Repo público creado y primer push a `main` hecho; secret `ZAI_API_KEY` puesto y bot de auto-handoff verificado (✅ en el log).
- Decisión de hosting: Cloudflare **Workers con Static Assets** (no Pages). Se probó vinext y se descartó: `/blog/[slug]` daba 500 en Workers por `useMDXComponent` (usa `new Function`); ver `TRAMPAS.md`. Cuenta de Cloudflare con login en `wrangler` (una sola cuenta).
- Template `dillionverma/portfolio@5ef12e4` importado (commit `6500c12`) con Next 16.2.12 y React 19.2.8 (parches de seguridad de mayo 2026).
- Sitio convertido a export estático: `output: "export"`, headers en `public/_headers`, paginación del blog por ruta (`/blog/page/N`), imágenes OG estáticas con fuentes leídas de disco, `wrangler.jsonc` solo con `assets` (`./out`). Verificado: build con 0, 3 y 7 posts, `wrangler dev` con todas las rutas en 200, `tsc` y `eslint` limpios.
- 90c953a docs: limpiar HANDOFF tras el primer run del bot y registrar decisiones
- 6500c12 feat: importar template Portfolio de Magic UI
- c6aa660 feat: export estático para Cloudflare Workers Static Assets
vinext se descartó: /blog/[slug] falla en Workers porque useMDXComponent usa new Function. Se pasa a output: "export" servido con wrangler (solo assets).
headers de seguridad y Content-Type de OG en public/_headers
paginación del blog por ruta (/blog/page/N) en vez de searchParams
imágenes OG estáticas con fuentes leídas de disco
generateStaticParams nunca vacío (verificado con 0, 3 y 7 posts)
docs: decisión de hosting y trampas nuevas

## Trabajo en progreso (sin commitear)

Nada.

## Lo que sigue

1. Reemplazar el contenido de ejemplo por el de Donovan: `src/data/resume.tsx` (nombre, bio, trabajo, proyectos, redes), imágenes en `public/` y posts en `content/`. Usar el PDF como fuente y solo capturas anonimizadas (repo público). Conservar `LICENSE`.
2. Primer deploy: `pnpm deploy` (build + `wrangler deploy`). La primera vez Cloudflare pide registrar el subdominio `*.workers.dev` de la cuenta; conviene desplegar ya con el contenido nuevo para no publicar la foto y bio de Dillion.
3. Conectar el dominio propio en Cloudflare (pendiente de definir cuál).

### Notas vivas

- Repo público: `DonovanZdev/portfolio-donovan`.
- El bot pega commits crudos en "Qué se hizo recientemente" (con `<code>`, trailers `Co-Authored-By` y encabezados huérfanos): revisar y limpiar a mano tras cada push.
- `Portafolio-Automatizaciones-Donovan.pdf` vive solo en local (ignorado por git).
- pnpm 12.4.2 instalado con `npm i -g pnpm` el 2026-09-18; el template trae `pnpm-lock.yaml`. Scripts: `pnpm build`, `pnpm preview` (local en :8787), `pnpm deploy`.
- Dominio propio: pendiente, se conecta después del primer deploy en `*.workers.dev`.
- Correo de contacto a publicar: por definir (el PDF muestra un correo de Gmail distinto al de la cuenta de Cloudflare; preguntar cuál va en el sitio).

## Cómo retomar en otra cuenta/máquina

1. `git clone` del repo y abrir la carpeta en Claude Code.
2. Correr `/resume`.
