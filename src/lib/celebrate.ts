import confetti from "canvas-confetti";

const COLORS = ["#0F6B4F", "#2FA77C", "#D69E35", "#F2B8A2", "#FFF6E5"];

/** A short, brand-coloured confetti burst. Skipped when the user prefers reduced motion. */
export function celebrate(intensity: "small" | "big" = "big") {
  if (typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  if (intensity === "small") {
    confetti({ particleCount: 40, spread: 60, startVelocity: 28, origin: { y: 0.7 }, colors: COLORS, scalar: 0.8 });
    return;
  }

  const end = Date.now() + 900;
  const frame = () => {
    confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.75 }, colors: COLORS });
    confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.75 }, colors: COLORS });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
