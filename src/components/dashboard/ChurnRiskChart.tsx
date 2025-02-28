
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ChurnRiskData {
  name: string;
  value: number;
  color: string;
}

interface ChurnRiskChartProps {
  data: ChurnRiskData[];
}

export function ChurnRiskChart({ data }: ChurnRiskChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: 'none', 
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              padding: '8px 12px',
            }}
            formatter={(value: number) => [`${value} users`, null]}
            labelFormatter={(index) => data[index].name}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
