import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// /demo는 막지 않는다. 막으면 검색엔진이 페이지의 noindex를 읽지 못한다.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
