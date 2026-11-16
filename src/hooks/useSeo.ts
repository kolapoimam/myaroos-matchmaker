import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE, getRouteSeo } from "@/seo/routes";

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Keeps the document title, description, canonical and social tags in sync with the current route */
export function useSeo(overrides?: { title?: string; description?: string; noindex?: boolean }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const route = getRouteSeo(pathname);
    const title = overrides?.title ?? route?.title ?? `Page not found | ${SITE.name}`;
    const description = overrides?.description ?? route?.description ?? SITE.description;
    const url = `${SITE.url}${pathname === "/" ? "/" : pathname}`;

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      overrides?.noindex || !route ? "noindex, follow" : "index, follow, max-image-preview:large"
    );

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [pathname, overrides?.title, overrides?.description, overrides?.noindex]);
}
