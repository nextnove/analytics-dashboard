import type { HourlyData } from '../../features/analytics/types/analytics.api';
import type { DateRange } from '../../features/analytics/types/analytics.model';

export const downloadCSV = (
  hourlyData: HourlyData[], 
  dateRange: DateRange, 
  compareEnabled: boolean
) => {
  const headers = compareEnabled 
    ? ['Date', 'Visitors', 'Page Views', 'Prev Visitors', 'Prev Page Views']
    : ['Date', 'Visitors', 'Page Views', 'Sessions'];
  
  const rows = hourlyData.map(d => 
    compareEnabled
      ? [d.hour, d.visitors, d.pageViews, d.prevVisitors || 0, d.prevPageViews || 0]
      : [d.hour, d.visitors, d.pageViews, d.sessions]
  );

  const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `analytics-${dateRange}${compareEnabled ? '-comparison' : ''}.csv`;
  a.click();
};

export const downloadJSON = (data: any, dateRange: DateRange, compareEnabled: boolean) => {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `analytics-${dateRange}${compareEnabled ? '-comparison' : ''}.json`;
  a.click();
};
