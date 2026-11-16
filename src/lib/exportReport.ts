import { toCanvas } from "html-to-image";
import { jsPDF } from "jspdf";

const PAPER = "#FBF8F1";
const PIXEL_RATIO = 2;

function fileStem(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const date = new Date().toISOString().slice(0, 10);
  return `myaroos-${slug}-${date}`;
}

async function renderToCanvas(node: HTMLElement) {
  if (document.fonts?.ready) await document.fonts.ready;
  // The first pass warms up font and image embedding in some browsers (notably Safari)
  await toCanvas(node, { pixelRatio: 1, backgroundColor: PAPER, cacheBust: true }).catch(() => undefined);
  return toCanvas(node, { pixelRatio: PIXEL_RATIO, backgroundColor: PAPER, cacheBust: true });
}

function triggerDownload(href: string, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = href;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/** Download the report node as a high resolution PNG */
export async function downloadReportPng(node: HTMLElement, name: string) {
  const canvas = await renderToCanvas(node);
  triggerDownload(canvas.toDataURL("image/png"), `${fileStem(name)}.png`);
}

/**
 * Download the report node as an A4 PDF.
 * Content is split between pages only at elements marked with `data-pdf-block`,
 * so text and bars are never cut in half.
 */
export async function downloadReportPdf(node: HTMLElement, name: string) {
  const canvas = await renderToCanvas(node);
  const scale = canvas.width / node.offsetWidth;

  const pageWidthMm = 210;
  const pageHeightMm = 297;
  const pageHeightPx = Math.floor(canvas.width * (pageHeightMm / pageWidthMm));

  // Safe break points (in canvas pixels): the top edge of every block
  const rootTop = node.getBoundingClientRect().top;
  const breaks = Array.from(node.querySelectorAll<HTMLElement>("[data-pdf-block]"))
    .map((el) => Math.round((el.getBoundingClientRect().top - rootTop) * scale))
    .filter((y) => y > 0)
    .sort((a, b) => a - b);

  const topPad = Math.round(40 * scale);
  const slices: [number, number][] = [];
  let start = 0;
  while (start < canvas.height) {
    const room = slices.length === 0 ? pageHeightPx : pageHeightPx - topPad;
    const limit = start + room;
    if (limit >= canvas.height) {
      slices.push([start, canvas.height]);
      break;
    }
    const candidates = breaks.filter((b) => b > start + room * 0.3 && b <= limit);
    const end = candidates.length ? candidates[candidates.length - 1] : limit;
    slices.push([start, end]);
    start = end;
  }

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  pdf.setProperties({ title: name, creator: "MyAroos", subject: "MyAroos report" });

  slices.forEach(([from, to], i) => {
    const page = document.createElement("canvas");
    page.width = canvas.width;
    page.height = pageHeightPx;
    const ctx = page.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, page.width, page.height);
    // Leave a little breathing room at the top of continuation pages
    const offset = i === 0 ? 0 : topPad;
    ctx.drawImage(canvas, 0, from, canvas.width, to - from, 0, offset, canvas.width, to - from);

    if (i > 0) pdf.addPage();
    pdf.addImage(page.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, pageWidthMm, pageHeightMm, undefined, "FAST");
  });

  pdf.save(`${fileStem(name)}.pdf`);
}
