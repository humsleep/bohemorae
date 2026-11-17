import type { MetadataRoute } from "next";
import { samples } from "@/lib/samples";
import { site } from "@/lib/site";

// 데모(/demo)는 noindex라 넣지 않는다.
const paths = [
  "",
  "/samples",
  "/pricing",
  "/apps",
  "/about",
  "/contact",
  "/terms",
  "/privacy",
  ...samples.map((s) => `/samples/${s.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: site.url + p }));
}
