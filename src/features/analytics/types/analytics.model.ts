// UI 모델 타입 정의
export type DateRange = 'today' | '7days' | '30days';
export type Theme = 'dark' | 'light';

export interface StatCardData {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  yesterdayValue?: string;
  yesterdayLabel?: string;
}

export interface AnalyticsState {
  theme: Theme;
  dateRange: DateRange;
  compareEnabled: boolean;
  loading: boolean;
  liveUsers: number;
}
