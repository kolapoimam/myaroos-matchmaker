import { forwardRef } from "react";
import { getScoreTone } from "@/lib/scoreTone";

export interface ReportData {
  /** e.g. "Marriage Readiness Report" */
  heading: string;
  /** Optional line under the heading, e.g. "Aisha & Yusuf" */
  subheading?: string;
  score: number;
  verdict: string;
  message: string;
  categories: { label: string; score: number }[];
  tips?: { area: string; items: string[] }[];
}

const C = {
  paper: "#FBF8F1",
  card: "#FFFFFF",
  ink: "#0F231C",
  muted: "#5B6B65",
  border: "#EAE2D2",
  emerald: "#0F6B4F",
  emeraldLight: "#2FA77C",
  gold: "#D69E35",
  mint: "#E3F4EC",
};

const display = '"Fraunces Variable", Fraunces, Georgia, serif';
const sans = '"Plus Jakarta Sans Variable", "Plus Jakarta Sans", system-ui, sans-serif';

/**
 * Print-ready report used for PNG and PDF downloads.
 * It always renders in the light theme with fixed colours and width,
 * so exports look the same on every device and in dark mode.
 */
const ReportCard = forwardRef<HTMLDivElement, { data: ReportData }>(({ data }, ref) => {
  const tone = getScoreTone(data.score);
  const size = 200;
  const stroke = 16;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const date = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return (
    <div
      ref={ref}
      style={{
        width: 820,
        background: C.paper,
        color: C.ink,
        fontFamily: sans,
        textAlign: "left",
        padding: 48,
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div data-pdf-block style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="40" height="40" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="16" fill="#0F5E4A" />
            <circle cx="32" cy="40.5" r="14" fill="none" stroke="#E2A93B" strokeWidth="5.4" />
            <polygon points="32.00,7.50 35.34,10.93 40.13,10.87 40.07,15.66 43.50,19.00 40.07,22.34 40.13,27.13 35.34,27.07 32.00,30.50 28.66,27.07 23.87,27.13 23.93,22.34 20.50,19.00 23.93,15.66 23.87,10.87 28.66,10.93" fill="#FBF6EC" />
            <polygon points="32.00,14.60 33.28,15.91 35.11,15.89 35.09,17.72 36.40,19.00 35.09,20.28 35.11,22.11 33.28,22.09 32.00,23.40 30.72,22.09 28.89,22.11 28.91,20.28 27.60,19.00 28.91,17.72 28.89,15.89 30.72,15.91" fill="#E2A93B" />
          </svg>
          <span style={{ fontFamily: display, fontSize: 26, fontWeight: 600 }}>
            My<span style={{ color: C.emerald }}>Aroos</span>
          </span>
        </div>
        <span style={{ fontSize: 13, color: C.muted }}>{date}</span>
      </div>

      <div style={{ height: 3, margin: "24px 0 32px", borderRadius: 3, background: C.gold }} />

      <div data-pdf-block style={{ textAlign: "center", position: "relative" }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 14px",
            borderRadius: 999,
            background: "rgba(214,158,53,0.14)",
            border: "1px solid rgba(214,158,53,0.45)",
            color: "#7A5418",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {data.heading}
        </div>
        {data.subheading && (
          <div style={{ fontFamily: display, fontSize: 30, fontWeight: 600, marginTop: 14 }}>{data.subheading}</div>
        )}

        {/* Score ring */}
        <div style={{ position: "relative", width: size, height: size, margin: "28px auto 0" }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.border} strokeWidth={stroke} />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={tone.color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - data.score / 100)}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 26 }}>{tone.emoji}</span>
            <span style={{ fontFamily: display, fontSize: 60, fontWeight: 600, lineHeight: 1 }}>
              {data.score}
              <span style={{ fontSize: 28, color: C.muted }}>%</span>
            </span>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: tone.color, marginTop: 4 }}>
              {tone.label}
            </span>
          </div>
        </div>

        <div style={{ fontFamily: display, fontSize: 26, fontWeight: 600, lineHeight: 1.25, margin: "28px auto 12px", maxWidth: 640, color: C.emerald }}>
          {data.verdict}
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: C.muted, maxWidth: 640, margin: "0 auto" }}>{data.message}</p>
      </div>

      {/* Category breakdown */}
      <div
        data-pdf-block
        style={{
          marginTop: 36,
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 24,
          padding: 28,
          position: "relative",
        }}
      >
        <div style={{ fontFamily: display, fontSize: 20, fontWeight: 600, marginBottom: 18 }}>Score breakdown</div>
        {data.categories.map((c) => {
          const t = getScoreTone(c.score);
          return (
            <div key={c.label} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}>
                <span style={{ fontWeight: 600 }}>{c.label}</span>
                <span style={{ fontWeight: 800, color: t.color }}>{c.score}%</span>
              </div>
              <div style={{ height: 10, borderRadius: 999, background: "#F1ECE1", overflow: "hidden" }}>
                <div style={{ width: `${Math.max(c.score, 2)}%`, height: "100%", borderRadius: 999, background: t.color }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips */}
      {data.tips && data.tips.length > 0 && (
        <div
          style={{
            marginTop: 20,
            background: C.mint,
            borderRadius: 24,
            padding: 28,
            position: "relative",
          }}
        >
          <div style={{ fontFamily: display, fontSize: 20, fontWeight: 600, marginBottom: 14 }}>Areas to work on</div>
          {data.tips.map((group) => (
            <div key={group.area} data-pdf-block style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.emerald, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                {group.area}
              </div>
              {group.items.map((tip) => (
                <div key={tip} style={{ display: "flex", gap: 10, fontSize: 14, lineHeight: 1.55, marginBottom: 4 }}>
                  <span style={{ color: C.gold, fontWeight: 800 }}>✦</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        data-pdf-block
        style={{
          marginTop: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 12,
          color: C.muted,
          position: "relative",
        }}
      >
        <span>A guidance tool only. Pray Istikhara and consult your family and scholars.</span>
        <span style={{ fontWeight: 700, color: C.emerald }}>myaroos.vercel.app</span>
      </div>
    </div>
  );
});

ReportCard.displayName = "ReportCard";

export default ReportCard;
