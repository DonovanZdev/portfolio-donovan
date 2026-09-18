# Trampas — Reglas que NO deben volver a romperse

> **Doc append-only.** Cuando aparezca un bug que merezca ser trampa, AGRÉGALO en la sección correspondiente. NO reescribir el doc.
>
> **Cuándo leer este doc**:
> - `/resume` NO lo lee por default.
> - Si la tarea toca un dominio listado abajo, `grep -n "<keyword>" TRAMPAS.md` y lee solo esos hits.

---

## Datos sensibles / confidencialidad

- **Nunca versionar grabaciones, audios ni transcripciones de clientes.** GitHub rechaza archivos de más de 100 MB y son datos ajenos. Van en `_privado/` (ignorado por git). Antes de un commit grande: `git status --short --ignored` y `git diff --cached --name-only | xargs du -ch | tail -1`.

## Continuidad entre sesiones (bot auto-handoff)

- **`success` en el workflow NO significa que el bot escribió.** El script sale con código 0 ante cualquier falla (429, API caída, sin key) para no romper nada. Abrir el log del paso y buscar `✅ HANDOFF.md actualizado`. Si dice `❌ Z.AI API error 429` (servicio sobrecargado), reintentar con `gh run rerun <id> -R <usuario>/<repo>`.
- **El modelo chico (GLM-4.7-Flash) puede confundir roles en "En una línea"** (ej. escribir que el desarrollador es el cliente). Revisar ese bloque tras cada corrida y corregirlo a mano; si el commit solo toca `.md`, el workflow no se dispara por `paths-ignore`.
- **La `ZAI_API_KEY` vive solo como secret del repo.** Se pone con `gh secret set ZAI_API_KEY -R <usuario>/<repo>` (la pide sin mostrarla). Nunca pegarla en el chat ni en archivos; si se pega, rotarla en z.ai y actualizar el secret.
- **Subir el repo DESPUÉS de poner el secret**, no antes: el primer push dispara el bot y sin key se salta en silencio.

## Cloudflare Workers / export estático (Next.js)

- **El blog NO puede ejecutarse en el servidor de Workers** (2026-09-18): `useMDXComponent` de `@content-collections/mdx/react` compila el MDX con `new Function(...)` al renderizar y Workers lo prohíbe (`EvalError: Code generation from strings disallowed`). Con vinext en modo servidor, `/blog/[slug]` daba 500 (y la página de error de producción no muestra la causa; se ve corriendo `vinext dev`). Por eso el sitio es **export estático** (`output: "export"`): todo se genera en el build, donde Node sí permite eval. No volver a modo servidor sin sustituir ese componente.
- **Requisitos de `output: "export"` en este proyecto:** sin `headers()` en `next.config.mjs` (los headers viven en `public/_headers`); sin `searchParams` (paginación por ruta `/blog/page/N`); rutas de imagen OG con `export const dynamic = "force-static"`, sin `runtime = "edge"`, y con `generateStaticParams`; las fuentes de las OG se leen con `readFile` (no con `fetch(new URL(...))`, que falla en build).
- **`generateStaticParams()` vacío rompe el build con `output: "export"`** (Next lo trata como si faltara). Por eso `/blog/[slug]`, su imagen OG y `/blog/page/[page]` devuelven siempre al menos un param (`"_"` o la página 2). Verificado con 0, 3 y 7 posts. Si se agrega otra ruta dinámica, aplicar lo mismo.
- **Las imágenes OG se exportan sin extensión**, así que Workers las serviría sin `Content-Type`: se declara `image/png` en `public/_headers` para `/opengraph-image`, `/blog/opengraph-image` y `/blog/*/opengraph-image`.
- **pnpm 12 bloquea los build scripts** (`ERR_PNPM_IGNORED_BUILDS`) y escribe placeholders `set this to true or false` en `pnpm-workspace.yaml` (`allowBuilds`). Ahí quedan `esbuild`, `unrs-resolver` y `workerd` en `true` y `sharp` en `false` (su script falla y no se usa: `images.unoptimized`). `pnpm add react@~19.2.6` terminó resolviendo React 19.3.0; React y React DOM van fijos en `19.2.8` en `package.json`.
- **Versiones mínimas de seguridad:** Next `>=16.2.5` y React `>=19.2.6` (parches de mayo 2026). El template traía Next 16.1.1.
- **Procesos de prueba huérfanos:** `pkill -f "<patrón>"` dentro de un comando bash que contiene ese mismo patrón mata a su propia shell (exit 144). Matar por PID. Un `vinext dev` o `wrangler dev` en background deja `workerd` vivo. Además, `vinext build` deja `.wrangler/deploy/config.json`, que hace fallar `wrangler` si se borra `dist/`: borrar `.wrangler/deploy`.
- **Las imágenes OG leen el avatar del disco** (`src/lib/og-avatar.ts`, data URI), no de `DATA.url`: antes hacían `<img src={URL absoluta}>` y satori la descargaba durante el build, lo que falla si el dominio aún no existe. No volver a usar `new URL(DATA.avatarUrl, DATA.url)` en las OG.
- **`git rm content/*.mdx` borra la carpeta `content/`** (git no versiona directorios vacíos) y luego `cat > content/x.mdx` falla: `mkdir -p content` antes de escribir.
- **Los posts NO llevan `# Título` en el cuerpo**: `src/app/blog/[slug]/page.tsx` ya pinta el `<h1>` con `post.title` y se duplicaría.
