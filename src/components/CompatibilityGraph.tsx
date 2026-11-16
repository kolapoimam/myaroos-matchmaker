import { getScoreTone } from "@/lib/scoreTone";

interface CompatibilityGraphProps {
  scores: {
    [key: string]: number;
  };
}

/** Category breakdown as animated horizontal bars */
const CompatibilityGraph = ({ scores }: CompatibilityGraphProps) => {
  const data = Object.entries(scores);

  return (
    <div className="space-y-4">
      {data.map(([name, value], i) => {
        const tone = getScoreTone(value);
        return (
          <div key={name} className="animate-rise" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="mb-1.5 flex items-center justify-between gap-4 text-sm">
              <span className="font-semibold">{name}</span>
              <span className="font-bold tabular-nums" style={{ color: tone.color }}>
                {value}%
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-[width] duration-1000 ease-out"
                style={{ width: `${Math.max(value, 2)}%`, background: `linear-gradient(90deg, ${tone.color}aa, ${tone.color})` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompatibilityGraph;
