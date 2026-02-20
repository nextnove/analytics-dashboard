// API 응답 타입 정의
export interface RealtimeData {
  realtime: {
    activeUsers: number;
    screenPageViews: number;
    averageSessionDuration: number;
    bounceRate: number;
  };
  comparison: {
    activeUsers: { current: number; previous: number; change: number };
    screenPageViews: { current: number; previous: number; change: number };
    averageSessionDuration: { current: number; previous: number; change: number };
    bounceRate: { current: number; previous: number; change: number };
  };
  yesterday: {
    visitors: number;
    pageViews: number;
  };
  total: {
    visitors: number;
    pageViews: number;
  };
}

export interface HourlyData {
  hour: string;
  date?: string;  // JSON 데이터에서 date로 올 수 있음
  visitors: number;
  pageViews: number;
  sessions: number;
  bounceRate: number;
  prevVisitors?: number;
  prevPageViews?: number;
}

export interface TopPage {
  path: string;
  title: string;
  pageViews: number;
  change: number;
}

export interface TrafficSource {
  source: string;
  percentage: number;
  sessions: number;
}

export interface Device {
  category: string;
  sessions: number;
  percentage: number;
}

export interface Browser {
  name: string;
  sessions: number;
  percentage: number;
}

export interface Country {
  country: string;
  countryCode: string;
  sessions: number;
  percentage: number;
}
