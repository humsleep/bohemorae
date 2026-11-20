import type { MetadataRoute } from "next";
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
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: site.url + p }));
}
