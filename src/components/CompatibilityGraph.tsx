
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface CompatibilityGraphProps {
  scores: {
    [key: string]: number;
  };
}

const CompatibilityGraph = ({ scores }: CompatibilityGraphProps) => {
  const data = Object.entries(scores).map(([name, value]) => ({
    name,
    score: value,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 70,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={70} 
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            domain={[0, 100]} 
            label={{ value: 'Compatibility %', angle: -90, position: 'insideLeft' }} 
          />
          <Tooltip 
            formatter={(value) => [`${value}%`, 'Compatibility']}
            labelFormatter={(name) => `Category: ${name}`}
          />
          <Legend />
          <Bar dataKey="score" name="Compatibility Score" fill="#10B981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompatibilityGraph;
