#!/usr/bin/env node
/**
 * Generates the testimonial avatars with DiceBear (notionists style) into public/avatars.
 * Run `npm run avatars` after adding or renaming a testimonial in src/components/TestimonialsCarousel.tsx.
 * Avatars are static files so the DiceBear library is not shipped to visitors.
 */
import { createAvatar } from "@dicebear/core";
import * as notionists from "@dicebear/notionists";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = await readFile(join(root, "src/components/TestimonialsCarousel.tsx"), "utf8");
const names = [...source.matchAll(/name: "([^"]+)"/g)].map((m) => m[1]);
const backgrounds = ["e3f4ec", "f6e7c8", "f9ddd3"];

export const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

await mkdir(join(root, "public/avatars"), { recursive: true });
for (const [i, name] of names.entries()) {
  const svg = createAvatar(notionists, {
    seed: name,
    size: 96,
    radius: 50,
    backgroundColor: [backgrounds[i % backgrounds.length]],
  }).toString();
  await writeFile(join(root, "public/avatars", `${slug(name)}.svg`), svg);
}
console.log(`avatars: wrote ${names.length} files to public/avatars`);
