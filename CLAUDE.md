# portfolio-donovan

Portafolio web personal de Donovan Zuñiga (automatización de procesos y sistemas a la medida), publicado en Cloudflare. Muestra experiencia, proyectos y casos de automatización (n8n, dashboards, cobranza, ventas) a posibles clientes y empleadores.

## Contexto

- **Quién es quién:** proyecto personal de Donovan (desarrollador) y a la vez su propio "cliente". No es parte del ecosistema Nexai (no comparte PocketBase/n8n/Gotenberg ni usa subdominio `nexai.mx`).
- **Base visual:** template "Portfolio" de Magic UI (`github.com/dillionverma/portfolio`, licencia MIT). Secciones: Hero, About, Work, Education, Projects, Hackathons, Contact y Blog (MDX).
- **Fuente de contenido:** `Portafolio-Automatizaciones-Donovan.pdf` en la raíz (solo local, ignorado por git). Resume casos reales: dashboards en tiempo real, ventas→pagos, cotización→cobranza y flujos de muchas ramas; cifras: 150+ workflows en producción, 3 servidores propios, 8+ empresas atendidas.
- **Restricción clave:** el repo es **público** y el PDF trae capturas con datos reales de clientes (nombres de empresas, folios, montos). Nada de eso se publica tal cual en el sitio.
- **Despliegue:** cuenta propia de Cloudflare, primero en `*.workers.dev`; el dominio propio se conecta después.

## Stack

- **Base:** Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 + shadcn/ui + Magic UI + `motion`. Blog con `content-collections` (MDX en `content/`). El template trae `pnpm-lock.yaml`.
- **Hosting:** Cloudflare Workers. La doc oficial (actualizada 2026-08-25) recomienda **vinext** (plugin de Vite que reimplementa la API de Next; beta) en lugar de OpenNext para apps Next.js nuevas, y deja Pages solo para exports estáticos. Camino: `npx vinext check` → `npx vinext init` (target Workers) → `npx @vinext/cloudflare deploy`.
- **Plan B si `vinext check` marca incompatibilidades:** export estático (`output: "export"`, el portafolio es casi todo estático) servido con Workers Static Assets, o el adaptador OpenNext (documentado como camino de mantenimiento).
- **Seguridad:** el template fija `next 16.1.1`. Cloudflare avisó (2026-05-06) de vulnerabilidades corregidas en Next `16.2.5` y React `19.2.6`. Subir a esas versiones o mayores **antes del primer deploy**.

## Reglas

1. **No hardcodear secretos.** Nada de API keys, tokens ni credenciales en el repo ni en los docs.
2. **Confidencialidad.** Repo público: no subir datos reales de clientes. Las capturas, PDFs y material con nombres de empresas, folios o montos van en `_privado/` (ignorado por git). En el sitio, usar capturas anonimizadas o datos inventados.
3. **Contenido primero, adornos después.** Antes de tocar diseño, reemplazar todo el contenido de ejemplo del template (nombre, bio, proyectos, redes) con el de Donovan. No dejar rastro de "Dillion Verma".
4. **Conservar la licencia MIT y el aviso de copyright del template** (`LICENSE`) al reutilizar su código.
5. **Verificar en build real:** cada cambio que toque configuración de Cloudflare o Next se prueba con `build` antes de commitear.

## Estado actual

Fase: **arranque**. Carpeta con bootstrap del sistema de continuidad (docs + bot auto-handoff). Aún no se importa el template de Magic UI ni hay deploy.

## Docs

- `HANDOFF.md` — estado vivo (chico). El bot `auto-handoff` mantiene "En una línea" y "Qué se hizo recientemente"; lo demás lo edita `/handoff` a mano.
- `TRAMPAS.md` — reglas que no deben volver a romperse. **Append-only.** `/resume` no lo lee por default: `grep -n "<keyword>" TRAMPAS.md` si la tarea toca ese dominio.

## Continuidad entre sesiones

Skills globales (`~/.claude/skills`): `/handoff` al cerrar sesión, `/resume` al abrir una nueva. El bot `auto-handoff` (GitHub Actions + Z.AI GLM-4.7-Flash, gratis) actualiza `HANDOFF.md` en cada push a `main` que toque código; requiere el secret `ZAI_API_KEY` del repo.
