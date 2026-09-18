import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Sitio 100% estático: Workers sirve ./out con Static Assets (sin código en el servidor).
  output: "export",
  images: { unoptimized: true },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
