import type { Metadata } from "next";
import { BlogList, getTotalPages } from "../../blog-list";

export const dynamicParams = false;

export function generateStaticParams() {
  // Con output: "export" Next exige al menos un param, así que siempre se genera /blog/page/2.
  // Si no hay segunda página, BlogList la ajusta a la última y se marca noindex.
  const extraPages = Math.max(getTotalPages() - 1, 1);
  return Array.from({ length: extraPages }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog - Página ${page}`,
    robots: Number(page) > getTotalPages() ? { index: false } : undefined,
  };
}

export default async function BlogPageN({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return <BlogList page={Number(page)} />;
}
