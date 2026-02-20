import { Download, TrendingUp } from 'lucide-react';
import type { DateRange, Theme } from '../types/analytics.model';

interface DashboardControlsProps {
  theme: Theme;
  dateRange: DateRange;
  compareEnabled: boolean;
  onDateRangeChange: (range: DateRange) => void;
  onCompareToggle: () => void;
  onDownloadCSV: () => void;
  onDownloadJSON: () => void;
}

export const DashboardControls = ({
  theme,
  dateRange,
  compareEnabled,
  onDateRangeChange,
  onCompareToggle,
  onDownloadCSV,
  onDownloadJSON
}: DashboardControlsProps) => {
  const ranges: { value: DateRange; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' }
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {ranges.map((range) => (
            <button
              key={range.value}
              onClick={() => onDateRangeChange(range.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                dateRange === range.value
                  ? 'bg-cyan-500 text-white'
                  : theme === 'dark'
                  ? 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {dateRange === '7days' && (
          <button
            onClick={onCompareToggle}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              compareEnabled
                ? 'bg-purple-500 text-white'
                : theme === 'dark'
                ? 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
                : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
            }`}
          >
            <TrendingUp size={16} />
            {compareEnabled ? 'Comparing with Last Week' : 'Compare with Last Week'}
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onDownloadCSV}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
            theme === 'dark'
              ? 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
              : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
          }`}
        >
          <Download size={16} />
          CSV
        </button>
        <button
          onClick={onDownloadJSON}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
            theme === 'dark'
              ? 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
              : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
          }`}
        >
          <Download size={16} />
          JSON
        </button>
      </div>
    </div>
  );
};
