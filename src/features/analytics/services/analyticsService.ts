import type { 
  RealtimeData, 
  HourlyData, 
  TopPage, 
  TrafficSource, 
  Device, 
  Browser, 
  Country 
} from '../types/analytics.api';
import type { DateRange } from '../types/analytics.model';

export interface AnalyticsData {
  realtimeData: RealtimeData;
  hourlyData: HourlyData[];
  topPages: TopPage[];
  trafficSources: TrafficSource[];
  devices: Device[];
  browsers: Browser[];
  countries: Country[];
}

// Vite의 base path를 가져옵니다 (import.meta.env.BASE_URL)
const getDataPath = (filename: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}data/${filename}`;
};

export const analyticsService = {
  async fetchAnalyticsData(
    dateRange: DateRange, 
    compareEnabled: boolean
  ): Promise<AnalyticsData> {
    const trafficFile = dateRange === 'today' 
      ? 'hourly-traffic.json'
      : dateRange === '7days'
      ? 'weekly-traffic.json'
      : 'monthly-traffic.json';

    const requests = [
      fetch(getDataPath('realtime.json')),
      fetch(getDataPath(trafficFile)),
      fetch(getDataPath('top-pages.json')),
      fetch(getDataPath('traffic-sources.json')),
      fetch(getDataPath('devices.json')),
      fetch(getDataPath('geography.json'))
    ];

    if (compareEnabled && dateRange === '7days') {
      requests.push(fetch(getDataPath('previous-week-traffic.json')));
    }

    const responses = await Promise.all(requests);
    const [realtime, traffic, pages, sources, devicesData, geo, prevWeek] = await Promise.all(
      responses.map(r => r.json())
    );

    let hourlyData: HourlyData[];

    if (dateRange === 'today') {
      hourlyData = traffic.hourlyTraffic.slice(-12);
    } else if (dateRange === '7days') {
      const currentWeek = traffic.weeklyTraffic.map((d: HourlyData) => ({
        hour: d.date || d.hour,
        visitors: d.visitors,
        pageViews: d.pageViews,
        sessions: d.sessions,
        bounceRate: d.bounceRate
      }));

      if (compareEnabled && prevWeek) {
        hourlyData = currentWeek.map((curr: HourlyData, index: number) => ({
          ...curr,
          prevVisitors: prevWeek.previousWeekTraffic[index]?.visitors || 0,
          prevPageViews: prevWeek.previousWeekTraffic[index]?.pageViews || 0
        }));
      } else {
        hourlyData = currentWeek;
      }
    } else {
      hourlyData = traffic.monthlyTraffic.map((d: HourlyData) => ({
        hour: d.date || d.hour,
        visitors: d.visitors,
        pageViews: d.pageViews,
        sessions: d.sessions,
        bounceRate: d.bounceRate
      }));
    }

    return {
      realtimeData: realtime,
      hourlyData,
      topPages: pages.topPages.slice(0, 5),
      trafficSources: sources.trafficSources.slice(0, 4),
      devices: devicesData.devices,
      browsers: devicesData.browsers.slice(0, 5),
      countries: geo.countries.slice(0, 5)
    };
  }
};
