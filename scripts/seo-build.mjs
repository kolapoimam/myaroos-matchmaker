#!/usr/bin/env node
/**
 * SEO and GEO build step.
 *
 *   node scripts/seo-build.mjs assets   -> writes public/sitemap.xml, public/llms.txt, public/llms-full.txt
 *   node scripts/seo-build.mjs pages    -> writes dist/<route>.html with per page meta and crawlable content
 *                                          (served at /<route> through `cleanUrls` in vercel.json)
 *
 * Content comes from src/seo/routes.ts, src/data/*.ts so everything stays in sync with the app.
 * Runs automatically through the `prebuild` and `postbuild` npm scripts.
 */
import { build } from "esbuild";
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const mode = process.argv[2] ?? "assets";

async function loadContent() {
  const outfile = join(root, "node_modules/.cache/myaroos-seo/content.mjs");
  await build({
    stdin: {
      contents: `
        export * from "./src/seo/routes.ts";
        export { categories } from "./src/data/readiness.ts";
        export { compatibilityQuestions, maleReligiousValues, femaleReligiousValues } from "./src/data/compatibility.ts";
        export { faq } from "./src/data/faq.ts";
      `,
      resolveDir: root,
      loader: "ts",
    },
    bundle: true,
    format: "esm",
    platform: "node",
    outfile,
    logLevel: "silent",
    alias: { "@": join(root, "src") },
    external: ["react", "react-dom", "lucide-react", "@radix-ui/*"],
  });
  const mod = await import(pathToFileURL(outfile).href + `?t=${Date.now()}`);
  await rm(dirname(outfile), { recursive: true, force: true });
  return mod;
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const today = new Date().toISOString().slice(0, 10);

/* ---------- public assets ---------- */

function sitemap({ SITE, routes }) {
  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${SITE.url}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function llms({ SITE, routes }) {
  const page = (p) => routes.find((r) => r.path === p);
  return `# ${SITE.name}

> ${SITE.name} is a free, open source web app that helps Muslims check how ready they are for marriage and how compatible they are with a potential spouse, based on Islamic values. It has a 23 question Marriage Readiness Quiz and a Compatibility Match Tool. Results show an overall score, category scores and practical tips, and can be downloaded as PNG or PDF. Everything runs in the browser. No account is needed and no answers are stored.

Key facts:
- Name: ${SITE.name} ("aroos" means bride in Arabic, عروس)
- Website: ${SITE.url}
- Price: free
- Privacy: no backend, no sign up, answers never leave the device
- Creator: ${SITE.author} (https://x.com/PiousGeek)
- Source code: ${SITE.repo} (MIT License)
- Audience: Muslims preparing for marriage, including those in arranged or family introduced matches, converts and their families
- It is a guidance tool. It does not replace a wali, family, scholars, or Istikhara

## Tools

- [Marriage Readiness Quiz](${SITE.url}/marriage-readiness): ${page("/marriage-readiness").summary}
- [Compatibility Match Tool](${SITE.url}/compatibility): ${page("/compatibility").summary}

## About

- [About and FAQ](${SITE.url}/about): ${page("/about").summary}
- [Full details for AI assistants](${SITE.url}/llms-full.txt): every question, scoring rule and FAQ answer in plain text

## Open source

- [GitHub repository](${SITE.repo}): React, TypeScript, Tailwind CSS, Vite
- [Contributing guide](${SITE.repo}/blob/main/CONTRIBUTING.md)

## Optional

- [Sitemap](${SITE.url}/sitemap.xml)
`;
}

function llmsFull(c) {
  const { SITE, routes, categories, compatibilityQuestions, maleReligiousValues, femaleReligiousValues, faq } = c;
  const q = (question, i) =>
    `${i + 1}. ${question.question}\n` +
    question.options.map((o) => `   - ${o.label} (score ${o.score})`).join("\n");

  const readiness = categories
    .map((cat) => `### ${cat.title}\n\n${cat.questions.map(q).join("\n")}`)
    .join("\n\n");
  const compat = compatibilityQuestions
    .map((cat) => `### ${cat.category}\n\n${cat.questions.map(q).join("\n")}`)
    .join("\n\n");
  const faqText = faq
    .map(
      (f) =>
        `### ${f.question}\n\n${f.answer[0]}${f.list ? "\n" + f.list.map((l) => `- ${l}`).join("\n") : ""}${
          f.answer.length > 1 ? "\n\n" + f.answer.slice(1).join("\n\n") : ""
        }`
    )
    .join("\n\n");

  return `${llms(c)}
---

# ${SITE.name} full reference

## Pages

${routes.map((r) => `- ${SITE.url}${r.path}\n  Title: ${r.title}\n  ${r.description}`).join("\n")}

## Marriage Readiness Quiz

The quiz is answered about yourself, one category at a time. Each option scores from 0 to 10. The overall result is the sum of your scores divided by the highest possible sum, shown as a percentage. Any answer scoring below 5 adds an improvement tip for its category.

Result bands:
- 80% and above: marriage ready
- 60% to 79%: almost there, a few areas to improve
- 40% to 59%: halfway, key pieces still missing
- Below 40%: not yet, focus on personal growth first

${readiness}

## Compatibility Match Tool

Steps:
1. Your info: nickname, age, gender, level of religious commitment (Practicing, Moderately Practicing, Non-Practicing) and the religious values that matter to you
2. Suitor's info: the same fields for the potential spouse
3. Compatibility: optional questions about the suitor, at least one per category

Score out of 100:
- Shared religious values: 40 points, based on how many of your selected values the suitor also has
- Religious commitment: 20 points for the same level, 10 points for Practicing with Moderately Practicing, 0 otherwise
- Compatibility questions: 40 points, from your answers about the suitor. Preference questions (where every option has the same score) do not raise or lower the score

Result bands:
- 80 and above: a great match
- 60 to 79: real potential, a few things to talk through
- 40 to 59: proceed with care, big differences
- Below 40: many red flags, needs a serious rethink

After the result, users can open an Islamic marriage checklist (meet the wali, pray Istikhara, discuss mahr and finances, family planning, living arrangements, boundaries, shared Islamic growth) or generate a respectful message to end things kindly.

### Religious values (for a man)

${maleReligiousValues.map((v) => `- ${v.label}`).join("\n")}

### Religious values (for a woman)

${femaleReligiousValues.map((v) => `- ${v.label}`).join("\n")}

${compat}

## Frequently asked questions

${faqText}
`;
}

/* ---------- per route HTML ---------- */

function faqJsonLd({ faq }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: [f.answer[0], ...(f.list ?? []), ...f.answer.slice(1)].join(" "),
      },
    })),
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function breadcrumbJsonLd(SITE, route) {
  if (route.path === "/") return "";
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
      { "@type": "ListItem", position: 2, name: route.title.split(" | ")[0], item: `${SITE.url}${route.path}` },
    ],
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function crawlableContent(c, route) {
  const { SITE, routes, categories, compatibilityQuestions, faq } = c;
  const nav = routes.map((r) => `<li><a href="${r.path}">${esc(r.title.split(" | ")[0])}</a></li>`).join("");
  let body = `<h1>${esc(route.title.split(" | ")[0])}</h1><p>${esc(route.summary)}</p>`;
  if (route.path === "/marriage-readiness") {
    body += categories
      .map((cat) => `<h2>${esc(cat.title)}</h2><ul>${cat.questions.map((q) => `<li>${esc(q.question)}</li>`).join("")}</ul>`)
      .join("");
  }
  if (route.path === "/compatibility") {
    body += compatibilityQuestions
      .map((cat) => `<h2>${esc(cat.category)}</h2><ul>${cat.questions.map((q) => `<li>${esc(q.question)}</li>`).join("")}</ul>`)
      .join("");
  }
  if (route.path === "/about" || route.path === "/") {
    body += `<h2>Frequently asked questions</h2>${faq
      .map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer.join(" "))}</p>`)
      .join("")}`;
  }
  return `<main>${body}<nav><ul>${nav}</ul></nav><p>Open source: <a href="${SITE.repo}">${SITE.repo}</a></p></main>`;
}

function renderRoute(html, c, route) {
  const { SITE } = c;
  const url = `${SITE.url}${route.path === "/" ? "/" : route.path}`;
  let out = html
    .replace(/<title>.*?<\/title>/s, `<title>${esc(route.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(route.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(route.description)}$2`)
    .replace(
      /<!--SEO:CONTENT-->.*?<!--\/SEO:CONTENT-->/s,
      `<!--SEO:CONTENT-->${crawlableContent(c, route)}<!--/SEO:CONTENT-->`
    );
  const ld = (route.path === "/about" || route.path === "/" ? faqJsonLd(c) : "") + breadcrumbJsonLd(SITE, route);
  out = out.replace("<!--SEO:FAQ-->", ld);
  return out;
}

/* ---------- main ---------- */

const content = await loadContent();

if (mode === "assets") {
  const pub = join(root, "public");
  await writeFile(join(pub, "sitemap.xml"), sitemap(content));
  await writeFile(join(pub, "llms.txt"), llms(content));
  await writeFile(join(pub, "llms-full.txt"), llmsFull(content));
  console.log("seo: wrote public/sitemap.xml, public/llms.txt, public/llms-full.txt");
} else if (mode === "pages") {
  const dist = join(root, "dist");
  const template = await readFile(join(dist, "index.html"), "utf8");
  for (const route of content.routes) {
    const file = route.path === "/" ? join(dist, "index.html") : join(dist, `${route.path.slice(1)}.html`);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, renderRoute(template, content, route));
  }
  console.log(`seo: wrote ${content.routes.length} prerendered route files to dist/`);
} else {
  console.error(`Unknown mode "${mode}". Use "assets" or "pages".`);
  process.exit(1);
}
