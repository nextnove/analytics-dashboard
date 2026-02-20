import { Users, Eye } from 'lucide-react';
import { formatNumber } from '../../../shared/utils/format';
import type { RealtimeData } from '../types/analytics.api';

interface AccumulatedStatsProps {
  realtimeData: RealtimeData;
}

export const AccumulatedStats = ({ realtimeData }: AccumulatedStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-linear-to-r from-cyan-600 to-blue-600">
            <Users size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-zinc-400 text-sm font-medium mb-1">Total Accumulated Visitors</h3>
            <p className="text-3xl font-bold text-white">
              {formatNumber(realtimeData.total.visitors)}
            </p>
            <p className="text-xs text-zinc-500 mt-1">All-time visitors</p>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-lg bg-linear-to-br from-purple-600 to-pink-600">
            <Eye size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-zinc-400 text-sm font-medium mb-1">Total Accumulated Page Views</h3>
            <p className="text-3xl font-bold text-white">
              {formatNumber(realtimeData.total.pageViews)}
            </p>
            <p className="text-xs text-zinc-500 mt-1">All-time page views</p>
          </div>
        </div>
      </div>
    </div>
  );
};
