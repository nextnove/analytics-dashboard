import { Users, Eye, Clock, TrendingUp } from 'lucide-react';
import { StatCard } from './StatCard';
import { formatDuration, formatNumber } from '../../../shared/utils/format';
import type { RealtimeData } from '../types/analytics.api';

interface StatsGridProps {
  realtimeData: RealtimeData;
}

export const StatsGrid = ({ realtimeData }: StatsGridProps) => {
  const stats = [
    {
      title: 'Total Visitors',
      value: formatNumber(realtimeData.realtime.activeUsers),
      change: realtimeData.comparison.activeUsers.change,
      icon: <Users size={24} className="text-white" />,
      color: 'from-blue-500 to-cyan-500',
      yesterdayValue: formatNumber(realtimeData.yesterday.visitors),
      yesterdayLabel: 'Yesterday'
    },
    {
      title: 'Page Views',
      value: formatNumber(realtimeData.realtime.screenPageViews),
      change: realtimeData.comparison.screenPageViews.change,
      icon: <Eye size={24} className="text-white" />,
      color: 'from-purple-500 to-pink-500',
      yesterdayValue: formatNumber(realtimeData.yesterday.pageViews),
      yesterdayLabel: 'Yesterday'
    },
    {
      title: 'Avg. Session',
      value: formatDuration(realtimeData.realtime.averageSessionDuration),
      change: realtimeData.comparison.averageSessionDuration.change,
      icon: <Clock size={24} className="text-white" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Bounce Rate',
      value: `${(realtimeData.realtime.bounceRate * 100).toFixed(1)}%`,
      change: realtimeData.comparison.bounceRate.change,
      icon: <TrendingUp size={24} className="text-white" />,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};
