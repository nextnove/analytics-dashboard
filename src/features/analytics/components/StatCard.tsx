import { ArrowUp, ArrowDown, Calendar } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  yesterdayValue?: string;
  yesterdayLabel?: string;
}

export const StatCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  color, 
  yesterdayValue, 
  yesterdayLabel 
}: StatCardProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-zinc-900 dark:bg-zinc-900 light:bg-white border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 rounded-xl p-6 hover:border-zinc-700 dark:hover:border-zinc-700 light:hover:border-zinc-300 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-linear-to-br ${color}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          isPositive ? 'text-emerald-400' : 'text-red-400'
        }`}>
          {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          {Math.abs(change)}%
        </div>
      </div>
      
      <h3 className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white dark:text-white light:text-black mb-2">{value}</p>
      
      {yesterdayValue && (
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Calendar size={12} />
          <span>{yesterdayLabel}: {yesterdayValue}</span>
        </div>
      )}
    </div>
  );
};
