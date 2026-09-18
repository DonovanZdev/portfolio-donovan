# Handoff — Estado al 2026-09-18

## En una línea

Proyecto personal de Donovan Zuñiga (desarrollador y dueño del sitio): su portafolio web sobre el template Portfolio de Magic UI, para publicarlo en Cloudflare Workers. Fase de arranque: bootstrap hecho, template todavía sin importar.

## Qué se hizo recientemente

- Bootstrap del proyecto desde el template del skill `new-project`.
- <code>28c322a</code> chore: bootstrap desde el template de new-project
Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>

Archivos modificados en ese rango:

## Trabajo en progreso (sin commitear)

Nada.

## Lo que sigue

1. Poner el secret del bot: `gh secret set ZAI_API_KEY -R DonovanZdev/portfolio-donovan` (lo hace Donovan en su terminal) y recién después hacer el primer push a `main`.
2. Importar el template `dillionverma/portfolio` a la raíz sin pisar los docs, subir Next.js a >=16.2.5 y React a >=19.2.6, y correr `npx vinext check`.
3. Reemplazar el contenido de ejemplo por el de Donovan (usando el PDF como fuente, sin datos reales de clientes) y desplegar a `*.workers.dev`.

### Notas vivas

- Repo público: `DonovanZdev/portfolio-donovan`.
- `Portafolio-Automatizaciones-Donovan.pdf` vive solo en local (ignorado por git).
- pnpm no estaba instalado el 2026-09-18 (sí node y npm); el template trae `pnpm-lock.yaml`.
- Dominio propio: pendiente, se conecta después del primer deploy en `*.workers.dev`.

## Cómo retomar en otra cuenta/máquina

1. `git clone` del repo y abrir la carpeta en Claude Code.
2. Correr `/resume`.
