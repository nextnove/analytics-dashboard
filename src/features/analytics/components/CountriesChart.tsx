import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Country } from '../types/analytics.api';
import type { Theme } from '../types/analytics.model';

interface CountriesChartProps {
  countries: Country[];
  theme: Theme;
}

export const CountriesChart = ({ countries, theme }: CountriesChartProps) => {
  return (
    <div className={`border rounded-xl p-6 ${
      theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
    }`}>
      <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        Top Countries
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={countries}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#27272a' : '#e5e7eb'} />
          <XAxis 
            dataKey="countryCode" 
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
              borderRadius: '8px'
            }}
          />
          <Bar dataKey="percentage" fill="#22d3ee" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
