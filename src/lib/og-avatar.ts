import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { DATA } from "@/data/resume";

const MIME_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

// Las imágenes OG se generan en el build: el avatar se lee de /public como data URI
// para no depender de que DATA.url ya exista en internet.
export async function getAvatarDataUri(): Promise<string | undefined> {
  if (!DATA.avatarUrl) return undefined;
  const mime = MIME_BY_EXT[DATA.avatarUrl.split(".").pop()?.toLowerCase() ?? ""];
  if (!mime) return undefined;
  const file = await readFile(join(process.cwd(), "public", DATA.avatarUrl));
  return `data:${mime};base64,${file.toString("base64")}`;
}
