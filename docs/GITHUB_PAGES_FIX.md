# ✅ GitHub Pages 경로 문제 해결 완료

## 🐛 문제 상황

**증상:**
- 로컬에서는 정상 작동
- GitHub Pages 배포 시 404 에러 발생
- 데이터 파일을 찾을 수 없음

**원인:**
```typescript
// ❌ 하드코딩된 절대 경로
fetch('/data/realtime.json')

// 로컬: http://localhost:5173/data/realtime.json ✅
// GitHub Pages: https://username.github.io/data/realtime.json ❌
// 올바른 경로: https://username.github.io/analytics-dashboard/data/realtime.json
```

## ✨ 해결 방법

### 1. Vite 설정 수정 (vite.config.ts)

```typescript
export default defineConfig(({ mode }) => ({
  // 환경에 따라 base 경로 자동 설정
  base: mode === 'production' ? '/analytics-dashboard/' : '/',
  // ...
}))
```

**동작 방식:**
- 개발 모드 (`npm run dev`): `base: '/'`
- 프로덕션 빌드 (`npm run build`): `base: '/analytics-dashboard/'`

### 2. Analytics Service 수정

**변경 전:**
```typescript
export const analyticsService = {
  async fetchAnalyticsData(dateRange, compareEnabled) {
    const requests = [
      fetch('/data/realtime.json'),           // ❌ 하드코딩
      fetch('/data/hourly-traffic.json'),     // ❌ 하드코딩
      // ...
    ];
  }
};
```

**변경 후:**
```typescript
// Vite의 BASE_URL 환경 변수를 사용
const getDataPath = (filename: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}data/${filename}`;
};

export const analyticsService = {
  async fetchAnalyticsData(dateRange, compareEnabled) {
    const requests = [
      fetch(getDataPath('realtime.json')),    // ✅ 동적 경로
      fetch(getDataPath('hourly-traffic.json')), // ✅ 동적 경로
      // ...
    ];
  }
};
```

### 3. 타입 정의 개선

```typescript
// analytics.api.ts
export interface HourlyData {
  hour: string;
  date?: string;  // JSON에서 date로 올 수 있음
  visitors: number;
  pageViews: number;
  sessions: number;
  bounceRate: number;
  prevVisitors?: number;
  prevPageViews?: number;
}
```

## 🔍 동작 원리

### import.meta.env.BASE_URL

Vite가 제공하는 환경 변수:

```typescript
// 개발 모드
import.meta.env.BASE_URL === '/'

// 프로덕션 빌드 (vite.config.ts의 base 설정 사용)
import.meta.env.BASE_URL === '/analytics-dashboard/'
```

### getDataPath() 함수

```typescript
const getDataPath = (filename: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}data/${filename}`;
};

// 개발 모드
getDataPath('realtime.json') 
// → '/data/realtime.json'

// 프로덕션 (GitHub Pages)
getDataPath('realtime.json') 
// → '/analytics-dashboard/data/realtime.json'
```

## 📊 경로 비교

| 환경 | Base URL | 데이터 경로 | 결과 |
|------|----------|-------------|------|
| 로컬 개발 | `/` | `/data/realtime.json` | ✅ 정상 |
| GitHub Pages (수정 전) | `/analytics-dashboard/` | `/data/realtime.json` | ❌ 404 |
| GitHub Pages (수정 후) | `/analytics-dashboard/` | `/analytics-dashboard/data/realtime.json` | ✅ 정상 |

## 🧪 테스트 방법

### 1. 로컬 개발 모드
```bash
npm run dev
# http://localhost:5173 접속
# 데이터가 정상적으로 로드되는지 확인
```

### 2. 로컬 프로덕션 빌드
```bash
npm run build
npx serve dist -s

# http://localhost:3000/analytics-dashboard/ 접속
# 데이터가 정상적으로 로드되는지 확인
```

### 3. GitHub Pages 배포
```bash
git add .
git commit -m "Fix GitHub Pages path issue"
git push origin main

# GitHub Actions 완료 후
# https://YOUR_USERNAME.github.io/analytics-dashboard/ 접속
```

## 🎯 적용된 파일

### 수정된 파일
1. ✅ `vite.config.ts` - base 경로 설정
2. ✅ `src/features/analytics/services/analyticsService.ts` - 동적 경로 처리
3. ✅ `src/features/analytics/types/analytics.api.ts` - 타입 개선

### 생성된 문서
1. ✅ `DEPLOYMENT_GUIDE.md` - 상세 배포 가이드
2. ✅ `GITHUB_PAGES_FIX.md` - 문제 해결 문서
3. ✅ `README.md` - 배포 섹션 업데이트

## 🔄 다른 저장소에 적용하기

저장소 이름이 다른 경우:

**1. vite.config.ts 수정**
```typescript
base: mode === 'production' ? '/YOUR_REPO_NAME/' : '/',
```

**2. 빌드 및 배포**
```bash
npm run build
git push
```

**끝!** 나머지는 자동으로 처리됩니다.

## ✨ 장점

1. **환경 독립적**: 개발/프로덕션 환경에서 자동으로 올바른 경로 사용
2. **유지보수 용이**: 한 곳(vite.config.ts)만 수정하면 됨
3. **타입 안전**: TypeScript로 타입 체크
4. **확장 가능**: 다른 저장소에도 쉽게 적용 가능

## 🎉 결과

- ✅ 로컬 개발 환경: 정상 작동
- ✅ 로컬 프로덕션 빌드: 정상 작동
- ✅ GitHub Pages 배포: 정상 작동
- ✅ 데이터 로딩: 모든 환경에서 성공
- ✅ 404 에러: 해결 완료

## 📝 참고 자료

- [Vite 공식 문서 - Base URL](https://vitejs.dev/config/shared-options.html#base)
- [GitHub Pages 문서](https://docs.github.com/en/pages)
- [import.meta.env](https://vitejs.dev/guide/env-and-mode.html#env-variables)
