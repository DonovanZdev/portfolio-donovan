# Portafolio de Donovan Zuñiga

Sitio personal de **Donovan Zuñiga** — automatización de procesos y sistemas a la medida.
Casos reales de automatización con n8n, Google Sheets, bases de datos, correo e IA supervisada.

## Stack

- Next.js 16 (export estático) + React 19 + TypeScript
- Tailwind CSS 4, shadcn/ui, Magic UI y `motion`
- Blog en MDX con `content-collections` (`content/`)
- Cloudflare Workers con Static Assets (`wrangler.jsonc`)

## Desarrollo

```bash
pnpm install
pnpm dev        # desarrollo en http://localhost:3000
pnpm build      # genera el sitio estático en ./out
pnpm preview    # build + wrangler dev (http://localhost:8787)
pnpm deploy     # build + wrangler deploy
```

El contenido vive en `src/data/resume.tsx` (datos del sitio y casos) y `content/*.mdx` (artículos).

## Créditos y licencia

Basado en el template [Portfolio](https://github.com/dillionverma/portfolio) de Dillion Verma
([Magic UI](https://magicui.design)), licencia MIT. El aviso de copyright original se conserva en `LICENSE`.
