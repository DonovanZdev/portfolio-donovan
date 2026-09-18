# Handoff — Estado al 2026-09-18

## En una línea

Proyecto personal de Donovan Zuñiga (desarrollador y dueño del sitio): su portafolio web sobre el template Portfolio de Magic UI, para publicarlo en Cloudflare Workers. Fase de arranque: bootstrap hecho, template todavía sin importar.

## Qué se hizo recientemente

- Bootstrap del proyecto desde el template del skill `new-project` (commit `28c322a`).
- Repo público creado y primer push a `main` hecho; secret `ZAI_API_KEY` puesto y bot de auto-handoff verificado (✅ en el log).
- Decisión de hosting: Cloudflare Workers con vinext (recomendado por la doc oficial de Cloudflare al 2026-08-25), no Pages. Cuenta de Cloudflare ya con login en `wrangler`.

## Trabajo en progreso (sin commitear)

Nada.

## Lo que sigue

1. Importar el template `dillionverma/portfolio` a la raíz sin pisar los docs, subir Next.js a >=16.2.5 y React a >=19.2.6, y correr `npx vinext check`.
2. Inicializar vinext (target Workers) y hacer el primer deploy a `*.workers.dev` para validar que el pipeline funciona con el contenido de ejemplo.
3. Reemplazar el contenido de ejemplo por el de Donovan (usando el PDF como fuente, sin datos reales de clientes) y desplegar a `*.workers.dev`.

### Notas vivas

- Repo público: `DonovanZdev/portfolio-donovan`.
- El bot pega commits crudos en "Qué se hizo recientemente" (con `<code>`, trailers `Co-Authored-By` y encabezados huérfanos): revisar y limpiar a mano tras cada push.
- `Portafolio-Automatizaciones-Donovan.pdf` vive solo en local (ignorado por git).
- pnpm no estaba instalado el 2026-09-18 (sí node y npm); el template trae `pnpm-lock.yaml`.
- Dominio propio: pendiente, se conecta después del primer deploy en `*.workers.dev`.

## Cómo retomar en otra cuenta/máquina

1. `git clone` del repo y abrir la carpeta en Claude Code.
2. Correr `/resume`.
