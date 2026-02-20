// 시간(초)을 '0m 0s' 형식으로 변환
export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

// 숫자에 콤마 추가 (예: 1234 -> 1,234)
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};
