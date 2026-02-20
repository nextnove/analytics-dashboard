import { Sun, Moon } from 'lucide-react';
import type { Theme } from '../types/analytics.model';

interface DashboardHeaderProps {
  theme: Theme;
  liveUsers: number;
  currentTime: Date;
  onThemeToggle: () => void;
}

export const DashboardHeader = ({ 
  theme, 
  liveUsers, 
  currentTime, 
  onThemeToggle 
}: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Real-time website traffic monitoring • Google Analytics 4 Data
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className={`px-4 py-2 rounded-lg border ${
          theme === 'dark' ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-white'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Live: <span className="font-bold text-emerald-400">{liveUsers}</span>
            </span>
          </div>
        </div>

        <button
          onClick={onThemeToggle}
          className={`p-2 rounded-lg transition-colors cursor-pointer ${
            theme === 'dark' ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-white hover:bg-zinc-100'
          } border ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-cyan-400">
            {currentTime.toLocaleTimeString('ko-KR')}
          </div>
          <div className={`text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-600'}`}>
            {currentTime.toLocaleDateString('ko-KR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
