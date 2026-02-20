import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { HourlyData } from '../types/analytics.api';
import type { DateRange, Theme } from '../types/analytics.model';

interface TrafficChartProps {
  data: HourlyData[];
  dateRange: DateRange;
  compareEnabled: boolean;
  theme: Theme;
}

export const TrafficChart = ({ data, dateRange, compareEnabled, theme }: TrafficChartProps) => {
  const getDateRangeLabel = () => {
    if (dateRange === 'today') return 'Last 12 hours (hourly)';
    if (dateRange === '7days') return 'Last 7 days (daily)';
    return 'Last 30 days (daily)';
  };

  return (
    <div className={`border rounded-xl p-6 ${
      theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Traffic Overview {compareEnabled && '(This Week vs Last Week)'}
          </h2>
          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {getDateRangeLabel()} • Real data from JSON
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
            <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {compareEnabled ? 'This Week Visitors' : 'Visitors'}
            </span>
          </div>
          {compareEnabled && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-600"></div>
              <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Last Week Visitors
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-400"></div>
            <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {compareEnabled ? 'This Week Page Views' : 'Page Views'}
            </span>
          </div>
          {compareEnabled && (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-600"></div>
              <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Last Week Page Views
              </span>
            </div>
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPrevVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0891b2" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPrevPageViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#27272a' : '#e5e7eb'} />
          <XAxis 
            dataKey="hour" 
            stroke={theme === 'dark' ? '#71717a' : '#9ca3af'}
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke={theme === 'dark' ? '#71717a' : '#9ca3af'}
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#18181b' : '#ffffff',
              border: `1px solid ${theme === 'dark' ? '#27272a' : '#e5e7eb'}`,
              borderRadius: '8px',
              color: theme === 'dark' ? '#fff' : '#000'
            }}
          />
          
          {compareEnabled && (
            <>
              <Area
                type="monotone"
                dataKey="prevVisitors"
                stroke="#0891b2"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#colorPrevVisitors)"
                name="Last Week Visitors"
              />
              <Area
                type="monotone"
                dataKey="prevPageViews"
                stroke="#7c3aed"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#colorPrevPageViews)"
                name="Last Week Page Views"
              />
            </>
          )}
          
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="#22d3ee"
            strokeWidth={2}
            fill="url(#colorVisitors)"
            name="Visitors"
          />
          <Area
            type="monotone"
            dataKey="pageViews"
            stroke="#a855f7"
            strokeWidth={2}
            fill="url(#colorPageViews)"
            name="Page Views"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
