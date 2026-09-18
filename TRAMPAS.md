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
