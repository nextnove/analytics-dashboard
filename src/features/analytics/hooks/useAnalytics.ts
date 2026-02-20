import { useState, useEffect } from 'react';
import { analyticsService, type AnalyticsData } from '../services/analyticsService';
import type { DateRange } from '../types/analytics.model';

export const useAnalytics = (dateRange: DateRange, compareEnabled: boolean) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const analyticsData = await analyticsService.fetchAnalyticsData(dateRange, compareEnabled);
        setData(analyticsData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, [dateRange, compareEnabled]);

  return { data, loading };
};

export const useLiveUsers = (initialValue: number = 247) => {
  const [liveUsers, setLiveUsers] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => {
        const change = Math.floor(Math.random() * 20) - 10;
        return Math.max(100, Math.min(500, prev + change));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return liveUsers;
};

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return currentTime;
};
