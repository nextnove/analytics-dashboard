import type { TrafficSource } from '../types/analytics.api';
import type { Theme } from '../types/analytics.model';

interface TrafficSourcesChartProps {
  sources: TrafficSource[];
  theme: Theme;
}

export const TrafficSourcesChart = ({ sources, theme }: TrafficSourcesChartProps) => {
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500'];

  return (
    <div className={`border rounded-xl p-6 ${
      theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
    }`}>
      <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        Traffic Sources
      </h2>
      <div className="space-y-4">
        {sources.map((source, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                {source.source}
              </span>
              <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
                {source.percentage.toFixed(1)}%
              </span>
            </div>
            <div className={`w-full rounded-full h-2 overflow-hidden ${
              theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'
            }`}>
              <div 
                className={`h-full ${colors[index]} rounded-full transition-all duration-500`}
                style={{ width: `${source.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
