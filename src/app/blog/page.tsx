import type { Metadata } from "next";
import { BlogList } from "./blog-list";

export const metadata: Metadata = {
  title: "Blog",
  description: "Casos y aprendizajes sobre automatización de procesos de negocio.",
  openGraph: {
    title: "Blog",
    description: "Casos y aprendizajes sobre automatización de procesos de negocio.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description: "Casos y aprendizajes sobre automatización de procesos de negocio.",
  },
};

export default function BlogPage() {
  return <BlogList page={1} />;
}
