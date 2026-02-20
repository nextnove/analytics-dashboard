import type { TopPage } from '../types/analytics.api';
import type { Theme } from '../types/analytics.model';

interface TopPagesTableProps {
  pages: TopPage[];
  theme: Theme;
}

export const TopPagesTable = ({ pages, theme }: TopPagesTableProps) => {
  return (
    <div className={`border rounded-xl p-6 ${
      theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
    }`}>
      <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        Top Pages
      </h2>
      <div className="space-y-3">
        {pages.map((page, index) => (
          <div key={index} className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
            theme === 'dark' ? 'bg-zinc-800/50 hover:bg-zinc-800' : 'bg-zinc-50 hover:bg-zinc-100'
          }`}>
            <div className="flex items-center gap-3">
              <span className={`font-mono text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {index + 1}
              </span>
              <div>
                <span className={`font-medium block ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {page.path}
                </span>
                <span className={`text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-600'}`}>
                  {page.title}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}>
                {page.pageViews.toLocaleString()}
              </span>
              <span className={`text-sm ${
                page.change >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {page.change >= 0 ? '+' : ''}{page.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
