import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { Device } from '../types/analytics.api';
import type { Theme } from '../types/analytics.model';

interface DevicesChartProps {
  devices: Device[];
  theme: Theme;
}

const COLORS = ['#22d3ee', '#a855f7', '#ec4899', '#f97316', '#10b981', '#3b82f6'];

export const DevicesChart = ({ devices, theme }: DevicesChartProps) => {
  return (
    <div className={`border rounded-xl p-6 ${
      theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
    }`}>
      <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        Devices
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={devices}
            dataKey="percentage"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {devices.map((_device, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
