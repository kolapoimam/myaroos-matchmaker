/** Shared helpers that turn a 0-100 score into a label, emoji and colour. */
export interface ScoreTone {
  label: string;
  emoji: string;
  /** Hex colour, safe to use in exported images */
  color: string;
}

export function getScoreTone(score: number): ScoreTone {
  if (score >= 80) return { label: "Excellent", emoji: "🌟", color: "#0F6B4F" };
  if (score >= 60) return { label: "Promising", emoji: "🌙", color: "#2FA77C" };
  if (score >= 40) return { label: "Needs work", emoji: "🧂", color: "#D69E35" };
  return { label: "Red flags", emoji: "🚩", color: "#D9534F" };
}
