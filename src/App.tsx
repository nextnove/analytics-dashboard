import { useState } from 'react';
import { Loading } from './shared/components/Loading';
import { downloadCSV, downloadJSON } from './shared/utils/download';
import {
  DashboardHeader,
  DashboardControls,
  StatsGrid,
  AccumulatedStats,
  TrafficChart,
  DevicesChart,
  CountriesChart,
  BrowsersChart,
  TopPagesTable,
  TrafficSourcesChart,
  useAnalytics,
  useLiveUsers,
  useCurrentTime,
  type DateRange,
  type Theme
} from './features/analytics';

function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [dateRange, setDateRange] = useState<DateRange>('7days');
  const [compareEnabled, setCompareEnabled] = useState(false);

  const { data, loading } = useAnalytics(dateRange, compareEnabled);
  const liveUsers = useLiveUsers();
  const currentTime = useCurrentTime();

  if (loading || !data) {
    return <Loading theme={theme} />;
  }

  const { realtimeData, hourlyData, topPages, trafficSources, devices, browsers, countries } = data;

  const handleDownloadCSV = () => {
    downloadCSV(hourlyData, dateRange, compareEnabled);
  };

  const handleDownloadJSON = () => {
    downloadJSON({ 
      dateRange,
      compareEnabled,
      hourlyData, 
      topPages, 
      trafficSources, 
      devices 
    }, dateRange, compareEnabled);
  };

  return (
    <div className={`min-h-screen p-8 transition-colors ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-zinc-50 text-black'
    }`}>
      <div className="max-w-7xl mx-auto mb-8">
        <DashboardHeader
          theme={theme}
          liveUsers={liveUsers}
          currentTime={currentTime}
          onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        />

        <DashboardControls
          theme={theme}
          dateRange={dateRange}
          compareEnabled={compareEnabled}
          onDateRangeChange={setDateRange}
          onCompareToggle={() => setCompareEnabled(!compareEnabled)}
          onDownloadCSV={handleDownloadCSV}
          onDownloadJSON={handleDownloadJSON}
        />
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        <StatsGrid realtimeData={realtimeData} />
        
        <AccumulatedStats realtimeData={realtimeData} />

        <TrafficChart
          data={hourlyData}
          dateRange={dateRange}
          compareEnabled={compareEnabled}
          theme={theme}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DevicesChart devices={devices} theme={theme} />
          <CountriesChart countries={countries} theme={theme} />
          <BrowsersChart browsers={browsers} theme={theme} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopPagesTable pages={topPages} theme={theme} />
          <TrafficSourcesChart sources={trafficSources} theme={theme} />
        </div>
      </div>

      <div className={`max-w-7xl mx-auto mt-8 pt-6 border-t ${
        theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'
      }`}>
        <p className={`text-center text-sm ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-600'}`}>
          Made with ❤️ by NextNove • Data from Google Analytics 4 (Simulated) • Updates every 5s
        </p>
      </div>
    </div>
  );
}

export default App;
