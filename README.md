# 📊 Analytics Dashboard - Feature-Based Architecture Edition

Google Analytics 4 스타일의 기능을 갖춘 실시간 웹 분석 대시보드  

![Version](https://img.shields.io/badge/version-3.0.0-blue)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Architecture](https://img.shields.io/badge/architecture-Feature--Based-green)
![License](https://img.shields.io/badge/license-MIT-green)

![Analytics Dashboard](/docs/images/dashboard1.webp)
![Analytics Dashboard](/docs/images/dashboard2.webp)
![Analytics Dashboard](/docs/images/dashboard3.webp)

[🚀 Live Demo](https://nextnove.github.io/analytics-dashboard/) 

## 🚀 빠른 참조

| 항목 | 설명 |
|------|------|
| **아키텍처** | Feature-Based Architecture |
| **컴포넌트** | 11개 독립 컴포넌트 |
| **커스텀 훅** | 3개 (useAnalytics, useLiveUsers, useCurrentTime) |
| **코드 라인** | 500+ 줄 → 70줄 (App.tsx) |
| **모듈 수** | 20+ 개 파일 |
| **빌드 크기** | ~612 KB (gzipped: ~178 KB) |
| **업데이트** | 5초마다 자동 갱신 |

**주요 디렉토리**
- `src/features/analytics/` - Analytics 기능 모듈
- `src/shared/` - 공통 컴포넌트 및 유틸리티
- `public/data/` - JSON 시뮬레이션 데이터

---

## ✨ 주요 기능

### 📈 실시간 통계 (6개 카드)
- **Total Visitors** - 실시간 방문자 + 어제 방문자 비교
- **Page Views** - 실시간 페이지뷰 + 어제 페이지뷰 비교
- **Avg. Session** - 평균 세션 시간
- **Bounce Rate** - 이탈률
- **Total Accumulated Visitors** - 누적 총 방문자
- **Total Accumulated Page Views** - 누적 총 페이지뷰

### 📊 차트 & 시각화 (5개)
- **Area Chart** - 트래픽 추이 (시간별/일별)
- **Pie Chart** - 디바이스 비율 (Desktop/Mobile/Tablet)
- **Bar Chart** - 국가별 트래픽 TOP 5
- **Donut Chart** - 브라우저 점유율 TOP 5
- **Progress Bar** - 트래픽 소스 분석

### 🎛️ 인터랙티브 기능
- ✅ **날짜 범위 필터** - Today / Last 7 Days / Last 30 Days
- ✅ **비교 모드** - 이번 주 vs 지난 주 (7일 선택 시)
- ✅ **다크/라이트 모드** - 테마 토글
- ✅ **데이터 다운로드** - CSV & JSON 내보내기
- ✅ **실시간 업데이트** - 5초마다 자동 갱신
- ✅ **Live Users** - 실시간 활성 사용자 표시

### 📋 추가 위젯
- **Top Pages** - 인기 페이지 TOP 5
- **Traffic Sources** - 트래픽 소스별 비율
- **Devices** - 디바이스 분포
- **Countries** - 국가별 방문자
- **Browsers** - 브라우저 점유율

---

## 🚀 빠른 시작

### 1. 프로젝트 생성
```bash
npm create vite@latest analytics-dashboard -- --template react-ts
cd analytics-dashboard
```

### 2. 패키지 설치
```bash
npm install recharts lucide-react
npm install -D tailwindcss @tailwindcss/vite
```

### 3. 설정 파일

**vite.config.ts**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**src/index.css**
```css
@import "tailwindcss";
```

### 4. 프로젝트 구조 생성

다음 구조로 파일들을 생성하세요:

```bash
# 디렉토리 생성
mkdir -p src/features/analytics/{components,hooks,services,types}
mkdir -p src/shared/{components,utils}
mkdir -p public/data

# 또는 Git Clone
git clone https://github.com/your-repo/analytics-dashboard.git
cd analytics-dashboard
npm install
```

**필수 파일 목록:**
- `src/features/analytics/` - 11개 컴포넌트 + 훅 + 서비스 + 타입
- `src/shared/` - 공통 컴포넌트 + 유틸리티
- `public/data/` - 9개 JSON 데이터 파일
- `src/App.tsx` - 메인 앱 (리팩토링된 버전)

### 5. 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

---

## 📁 프로젝트 구조

```
analytics-dashboard/
├── public/
│   └── data/                              # JSON 데이터 파일
│       ├── realtime.json                  # 실시간 통계 + 어제/누적 데이터
│       ├── hourly-traffic.json            # 24시간 트래픽 (시간별)
│       ├── weekly-traffic.json            # 7일 트래픽 (일별)
│       ├── monthly-traffic.json           # 30일 트래픽 (일별)
│       ├── previous-week-traffic.json     # 지난 주 데이터 (비교용)
│       ├── top-pages.json                 # 인기 페이지 TOP 10
│       ├── traffic-sources.json           # 트래픽 소스 분석
│       ├── devices.json                   # 디바이스/브라우저/OS
│       └── geography.json                 # 국가/도시별 데이터
│
├── src/
│   ├── features/                          # Feature 기반 모듈
│   │   └── analytics/                     # Analytics 기능
│   │       ├── components/                # UI 컴포넌트
│   │       │   ├── StatsGrid.tsx          # 통계 카드 그리드
│   │       │   ├── StatCard.tsx           # 개별 통계 카드
│   │       │   ├── AccumulatedStats.tsx   # 누적 통계
│   │       │   ├── TrafficChart.tsx       # 트래픽 차트
│   │       │   ├── DevicesChart.tsx       # 디바이스 차트
│   │       │   ├── BrowsersChart.tsx      # 브라우저 차트
│   │       │   ├── CountriesChart.tsx     # 국가별 차트
│   │       │   ├── TopPagesTable.tsx      # 상위 페이지 테이블
│   │       │   ├── TrafficSourcesChart.tsx # 트래픽 소스 차트
│   │       │   ├── DashboardHeader.tsx    # 대시보드 헤더
│   │       │   └── DashboardControls.tsx  # 대시보드 컨트롤
│   │       │
│   │       ├── hooks/                     # 커스텀 훅
│   │       │   └── useAnalytics.ts        # 분석 데이터 훅 (3개)
│   │       │
│   │       ├── services/                  # API 서비스
│   │       │   └── analyticsService.ts    # 데이터 페칭 로직
│   │       │
│   │       ├── types/                     # 타입 정의
│   │       │   ├── analytics.api.ts       # API 응답 타입
│   │       │   └── analytics.model.ts     # UI 모델 타입
│   │       │
│   │       └── index.ts                   # Feature 진입점 (exports)
│   │
│   ├── shared/                            # 공통 모듈
│   │   ├── components/                    # 공통 컴포넌트
│   │   │   ├── Card.tsx                   # 카드 컴포넌트
│   │   │   └── Loading.tsx                # 로딩 컴포넌트
│   │   │
│   │   ├── utils/                         # 유틸리티 함수
│   │   │   ├── format.ts                  # 포맷 함수
│   │   │   └── download.ts                # 다운로드 함수
│   │   │
│   │   └── index.ts                       # Shared 진입점 (exports)
│   │
│   ├── App.tsx                            # 메인 앱 (70줄)
│   ├── main.tsx                           # 엔트리 포인트
│   └── index.css                          # Tailwind imports
│
├── index.html                             # HTML 템플릿
├── vite.config.ts                         # Vite 설정
├── tsconfig.json                          # TypeScript 설정
├── package.json                           # 패키지 정보
└── README.md                              # 프로젝트 문서
```

### 🏗️ 아키텍처 특징

**Feature-Based Architecture**
- 기능별로 모듈화된 구조
- 각 feature는 독립적으로 관리
- 컴포넌트, 훅, 서비스, 타입이 한 곳에 집중

**계층 분리**
- `components/`: UI 레이어
- `hooks/`: 비즈니스 로직 레이어
- `services/`: 데이터 레이어
- `types/`: 타입 정의 레이어

**코드 재사용**
- `shared/`: 여러 feature에서 공통으로 사용하는 모듈
- 중복 코드 최소화
- 유지보수성 향상

---

## 🎨 데이터 구조

### realtime.json
```json
{
  "realtime": {
    "activeUsers": 1247,
    "screenPageViews": 3892,
    "averageSessionDuration": 204,
    "bounceRate": 0.423
  },
  "comparison": {
    "activeUsers": { "current": 1247, "previous": 1112, "change": 12.1 }
  },
  "yesterday": {
    "visitors": 54678,
    "pageViews": 109234
  },
  "total": {
    "visitors": 2847561,
    "pageViews": 5694328
  }
}
```

### weekly-traffic.json
```json
{
  "weeklyTraffic": [
    { "date": "02/13", "visitors": 45234, "pageViews": 89456 },
    { "date": "02/14", "visitors": 48567, "pageViews": 96234 },
    ...
  ]
}
```

---

## 🎯 사용 방법

### 기본 사용법

**1. 날짜 범위 선택**
- **Today** - 최근 12시간 (시간별 데이터)
- **Last 7 Days** - 최근 7일 (일별 데이터)
- **Last 30 Days** - 최근 30일 (일별 데이터)

**2. 비교 모드**
- "Last 7 Days" 선택
- "Compare with Last Week" 버튼 클릭
- 차트에 이번 주(실선) vs 지난 주(점선) 표시

**3. 데이터 다운로드**
- **CSV**: 엑셀/스프레드시트용
- **JSON**: 프로그래밍/데이터 분석용

**4. 테마 변경**
- 우측 상단 해/달 아이콘 클릭
- 다크 모드 ↔ 라이트 모드

### 코드 사용 예시

**Feature 임포트**
```typescript
import {
  DashboardHeader,
  StatsGrid,
  TrafficChart,
  useAnalytics,
  type DateRange,
  type Theme
} from './features/analytics';
```

**Shared 임포트**
```typescript
import { Loading } from './shared/components/Loading';
import { downloadCSV, formatNumber } from './shared/utils';
```

**커스텀 훅 사용**
```typescript
function MyComponent() {
  const { data, loading } = useAnalytics('7days', false);
  const liveUsers = useLiveUsers();
  const currentTime = useCurrentTime();
  
  if (loading) return <Loading />;
  
  return <StatsGrid realtimeData={data.realtimeData} />;
}
```

---

## 🔗 실제 데이터 연동

현재는 **시뮬레이션 데이터**를 사용합니다. 실제 데이터와 연동하려면:

### 옵션 1: Google Analytics 4 API

**1. analyticsService.ts 수정**
```typescript
// src/features/analytics/services/analyticsService.ts
export const analyticsService = {
  async fetchAnalyticsData(dateRange: DateRange, compareEnabled: boolean) {
    const response = await fetch(
      'https://analyticsdata.googleapis.com/v1beta/properties/YOUR_PROPERTY_ID:runReport',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
          metrics: [
            { name: 'activeUsers' },
            { name: 'screenPageViews' }
          ]
        })
      }
    );
    const data = await response.json();
    return transformGA4Data(data);
  }
};
```

### 옵션 2: 자체 백엔드 API

**1. API 엔드포인트 생성**
```typescript
// src/features/analytics/services/analyticsService.ts
export const analyticsService = {
  async fetchAnalyticsData(dateRange: DateRange, compareEnabled: boolean) {
    const response = await fetch(`https://your-api.com/analytics?range=${dateRange}`);
    return await response.json();
  }
};
```

**2. 백엔드 예시 (Node.js/Express)**
```javascript
app.get('/analytics', async (req, res) => {
  const { range } = req.query;
  const data = await db.getAnalytics(range);
  res.json(data);
});
```

### 옵션 3: Firebase Realtime Database

**1. Firebase 설정**
```typescript
// src/features/analytics/services/analyticsService.ts
import { getDatabase, ref, onValue } from 'firebase/database';

export const useRealtimeAnalytics = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const db = getDatabase();
    const analyticsRef = ref(db, 'analytics');
    
    const unsubscribe = onValue(analyticsRef, (snapshot) => {
      setData(snapshot.val());
    });
    
    return () => unsubscribe();
  }, []);
  
  return data;
};
```

---

## ⚙️ 커스터마이징

### 1. 새로운 통계 카드 추가

**StatsGrid.tsx 수정**
```typescript
// src/features/analytics/components/StatsGrid.tsx
import { Target } from 'lucide-react';

const stats = [
  // 기존 통계...
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: 5.4,
    icon: <Target size={24} className="text-white" />,
    color: 'from-indigo-500 to-blue-500'
  }
];
```

### 2. 차트 색상 변경

**각 차트 컴포넌트에서 COLORS 수정**
```typescript
// src/features/analytics/components/DevicesChart.tsx
const COLORS = [
  '#22d3ee',  // Cyan
  '#a855f7',  // Purple
  '#ec4899',  // Pink
  '#f97316',  // Orange
  '#10b981',  // Green
  '#3b82f6'   // Blue
];
```

### 3. 데이터 갱신 주기 변경

**useAnalytics.ts 수정**
```typescript
// src/features/analytics/hooks/useAnalytics.ts
useEffect(() => {
  loadData();
  
  // 현재: 5초마다 갱신
  const interval = setInterval(loadData, 5000);
  
  // 10초로 변경
  // const interval = setInterval(loadData, 10000);
  
  return () => clearInterval(interval);
}, [dateRange, compareEnabled]);
```

### 4. 새로운 차트 추가

**1단계: 컴포넌트 생성**
```typescript
// src/features/analytics/components/NewChart.tsx
export const NewChart = ({ data, theme }: NewChartProps) => {
  return (
    <div className={`border rounded-xl p-6 ${
      theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
    }`}>
      <h2 className="text-xl font-bold mb-4">New Chart</h2>
      {/* 차트 구현 */}
    </div>
  );
};
```

**2단계: index.ts에 export 추가**
```typescript
// src/features/analytics/index.ts
export { NewChart } from './components/NewChart';
```

**3단계: App.tsx에서 사용**
```typescript
// src/App.tsx
import { NewChart } from './features/analytics';

<NewChart data={data.newData} theme={theme} />
```

### 5. 커스텀 훅 추가

```typescript
// src/features/analytics/hooks/useCustomHook.ts
export const useCustomHook = () => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // 로직 구현
  }, []);
  
  return state;
};
```

---

## 📦 패키지 정보

### Dependencies
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "recharts": "^3.7.0",
  "lucide-react": "^0.574.0"
}
```

### DevDependencies
```json
{
  "@tailwindcss/vite": "^4.2.0",
  "tailwindcss": "^4.2.0",
  "@vitejs/plugin-react": "^5.1.1",
  "typescript": "~5.9.3",
  "vite": "^7.3.1"
}
```

---

## 🚀 배포

### Vercel 배포
```bash
npm run build
vercel --prod
```

### Netlify 배포
```bash
npm run build
# dist 폴더를 Netlify에 드래그 앤 드롭
```

### GitHub Pages 배포
1. `vite.config.ts`에 base 경로 추가
```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/analytics-dashboard/',  // 저장소 이름
})
```

2. `.github/workflows/deploy.yml` 생성
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🐛 문제 해결

### Recharts 에러
```bash
npm install recharts@latest
```

### Tailwind 스타일 미적용
```bash
# vite.config.ts 확인
# tailwindcss 플러그인이 추가되었는지 확인
```

### 데이터 로드 실패
```
Error: Failed to fetch /data/realtime.json
```
→ `public/data/` 폴더에 모든 JSON 파일이 있는지 확인

### 빌드 에러
```bash
# 캐시 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📊 성능 최적화

### 1. 컴포넌트 메모이제이션

**React.memo 사용**
```typescript
// src/features/analytics/components/TrafficChart.tsx
import { memo } from 'react';

export const TrafficChart = memo(({ data, dateRange, compareEnabled, theme }) => {
  return (
    <ResponsiveContainer>
      <AreaChart data={data}>
        {/* 차트 구현 */}
      </AreaChart>
    </ResponsiveContainer>
  );
});
```

### 2. 데이터 로드 최적화

**중복 API 호출 방지**
```typescript
// src/features/analytics/hooks/useAnalytics.ts
useEffect(() => {
  let isActive = true;
  
  const loadData = async () => {
    if (!isActive) return;
    
    try {
      const analyticsData = await analyticsService.fetchAnalyticsData(
        dateRange, 
        compareEnabled
      );
      if (isActive) {
        setData(analyticsData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };
  
  loadData();
  return () => { isActive = false; };
}, [dateRange, compareEnabled]);
```

### 3. 차트 렌더링 최적화

**useMemo로 계산 캐싱**
```typescript
const chartData = useMemo(() => {
  return hourlyData.map(d => ({
    ...d,
    formattedVisitors: formatNumber(d.visitors)
  }));
}, [hourlyData]);
```

### 4. 번들 크기 최적화

**Tree Shaking 활용**
```typescript
// ❌ 전체 임포트
import * as Icons from 'lucide-react';

// ✅ 필요한 것만 임포트
import { Users, Eye, Clock } from 'lucide-react';
```

**Code Splitting**
```typescript
// src/App.tsx
import { lazy, Suspense } from 'react';

const TrafficChart = lazy(() => 
  import('./features/analytics').then(m => ({ default: m.TrafficChart }))
);

<Suspense fallback={<Loading />}>
  <TrafficChart data={data} />
</Suspense>
```

### 5. 이미지 최적화

**WebP 포맷 사용**
```html
<!-- index.html -->
<link rel="icon" type="image/webp" href="/favicon.webp" />
```

### 성능 측정

```bash
# Lighthouse 실행
npm run build
npx serve dist
# Chrome DevTools > Lighthouse 실행
```

**목표 지표**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

---

## �️ 아키텍처 가이드

### Feature-Based Architecture 장점

**1. 모듈화 (Modularity)**
- 각 기능이 독립적인 폴더에 구성
- 관련 파일들이 한 곳에 모여 있어 찾기 쉬움
- 기능 단위로 추가/제거 가능

**2. 확장성 (Scalability)**
```
새로운 기능 추가 시:
src/features/reports/
  ├── components/
  ├── hooks/
  ├── services/
  ├── types/
  └── index.ts
```

**3. 재사용성 (Reusability)**
- `shared/` 폴더에 공통 컴포넌트/유틸리티 집중
- 여러 feature에서 동일한 코드 재사용
- DRY (Don't Repeat Yourself) 원칙 준수

**4. 테스트 용이성 (Testability)**
```typescript
// 각 모듈을 독립적으로 테스트
describe('useAnalytics', () => {
  it('should fetch analytics data', async () => {
    const { result } = renderHook(() => useAnalytics('7days', false));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBeDefined();
  });
});
```

**5. 유지보수성 (Maintainability)**
- 코드 변경 시 영향 범위가 명확
- 버그 수정이 용이
- 새로운 개발자의 온보딩 시간 단축

### 디렉토리 구조 규칙

**features/**
- 비즈니스 로직과 UI가 결합된 기능 모듈
- 각 feature는 독립적으로 동작 가능
- 다른 feature에 의존하지 않음

**shared/**
- 여러 feature에서 공통으로 사용하는 코드
- 비즈니스 로직이 없는 순수 유틸리티
- UI 컴포넌트는 최소한의 스타일만 포함

### 파일 명명 규칙

**컴포넌트**: PascalCase
- `StatsGrid.tsx`
- `TrafficChart.tsx`

**훅**: camelCase with 'use' prefix
- `useAnalytics.ts`
- `useLiveUsers.ts`

**서비스**: camelCase with 'Service' suffix
- `analyticsService.ts`

**타입**: PascalCase or camelCase
- `analytics.api.ts` (파일명)
- `RealtimeData` (타입명)

### Import 규칙

**절대 경로 사용 권장**
```typescript
// ❌ 상대 경로
import { StatsGrid } from '../../../features/analytics/components/StatsGrid';

// ✅ 절대 경로 (tsconfig.json 설정 필요)
import { StatsGrid } from '@/features/analytics';
```

**배럴 export 활용**
```typescript
// src/features/analytics/index.ts
export * from './components/StatsGrid';
export * from './hooks/useAnalytics';

// 사용
import { StatsGrid, useAnalytics } from './features/analytics';
```

---

## 🎓 학습 자료

### 사용된 기술 스택
- **React 19** - https://react.dev
- **TypeScript** - https://www.typescriptlang.org
- **Recharts** - https://recharts.org
- **Tailwind CSS v4** - https://tailwindcss.com
- **Vite** - https://vitejs.dev
- **Lucide React** - https://lucide.dev

### 추천 학습 순서
1. **React Hooks** (useState, useEffect, useMemo, useCallback)
2. **TypeScript 기초** (타입, 인터페이스, 제네릭)
3. **Recharts** 차트 라이브러리
4. **Tailwind CSS** 유틸리티 클래스
5. **Vite** 빌드 도구
6. **Feature-Based Architecture** 패턴

### 관련 문서
- [React 공식 문서](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Recharts API](https://recharts.org/en-US/api)
- [Tailwind CSS v4 문서](https://tailwindcss.com/docs)
- [Feature-Sliced Design](https://feature-sliced.design/)

### 추천 도구
- **VS Code Extensions**
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin (Volar)
  
- **Chrome Extensions**
  - React Developer Tools
  - Redux DevTools (상태 관리 추가 시)

---

## 🧪 테스트

### 테스트 환경 설정

**1. 패키지 설치**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

**2. vitest.config.ts 생성**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

**3. 테스트 스크립트 추가**
```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### 테스트 예시

**컴포넌트 테스트**
```typescript
// src/features/analytics/components/__tests__/StatCard.test.tsx
import { render, screen } from '@testing-library/react';
import { StatCard } from '../StatCard';
import { Users } from 'lucide-react';

describe('StatCard', () => {
  it('renders stat card with correct values', () => {
    render(
      <StatCard
        title="Total Visitors"
        value="1,247"
        change={12.1}
        icon={<Users size={24} />}
        color="from-blue-500 to-cyan-500"
      />
    );
    
    expect(screen.getByText('Total Visitors')).toBeInTheDocument();
    expect(screen.getByText('1,247')).toBeInTheDocument();
    expect(screen.getByText('12.1%')).toBeInTheDocument();
  });
});
```

**훅 테스트**
```typescript
// src/features/analytics/hooks/__tests__/useAnalytics.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useAnalytics } from '../useAnalytics';

describe('useAnalytics', () => {
  it('should fetch analytics data', async () => {
    const { result } = renderHook(() => useAnalytics('7days', false));
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.realtimeData).toBeDefined();
  });
});
```

**서비스 테스트**
```typescript
// src/features/analytics/services/__tests__/analyticsService.test.ts
import { analyticsService } from '../analyticsService';

describe('analyticsService', () => {
  it('should fetch analytics data for 7 days', async () => {
    const data = await analyticsService.fetchAnalyticsData('7days', false);
    
    expect(data).toBeDefined();
    expect(data.realtimeData).toBeDefined();
    expect(data.hourlyData).toHaveLength(7);
  });
});
```

**유틸리티 테스트**
```typescript
// src/shared/utils/__tests__/format.test.ts
import { formatDuration, formatNumber } from '../format';

describe('format utils', () => {
  it('should format duration correctly', () => {
    expect(formatDuration(125)).toBe('2m 5s');
    expect(formatDuration(60)).toBe('1m 0s');
  });
  
  it('should format number with commas', () => {
    expect(formatNumber(1234)).toBe('1,234');
    expect(formatNumber(1234567)).toBe('1,234,567');
  });
});
```

### 테스트 실행

```bash
# 모든 테스트 실행
npm test

# UI 모드로 실행
npm run test:ui

# 커버리지 확인
npm run test:coverage
```

---

## 📝 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

---

Made with ❤️ by **NextNove**

⭐ 이 프로젝트가 유용하다면 Star를 눌러주세요!

---

## 📋 변경 이력 (Changelog)

### v3.0.0 (2024-02-20)
**🎉 Major Refactoring - Feature-Based Architecture**
- ✨ Feature-Based Architecture로 전면 리팩토링
- 📁 20+ 개 모듈로 코드 분리 (500+ 줄 → 각 50줄 이하)
- 🎯 11개 독립 컴포넌트 생성
- 🪝 3개 커스텀 훅 분리 (useAnalytics, useLiveUsers, useCurrentTime)
- 🔧 서비스 레이어 추가 (analyticsService)
- 📝 타입 정의 분리 (analytics.api.ts, analytics.model.ts)
- 🛠️ 공통 유틸리티 모듈화 (format, download)
- 📚 상세한 문서화 및 가이드 추가
- ✅ 테스트 가이드 추가
- 🚀 성능 최적화 가이드 추가

### v2.0.0 (2024-02-15)
- ✨ 누적 통계 카드 2개 추가
- 📊 비교 모드 기능 추가 (이번 주 vs 지난 주)
- 🎨 다크/라이트 모드 지원
- 📥 CSV/JSON 다운로드 기능
- ⏱️ 실시간 업데이트 (5초)
- 🌍 국가별 차트 추가

### v1.0.0 (2024-02-01)
- 🎉 초기 릴리즈
- 📈 기본 통계 카드 4개
- 📊 트래픽 차트
- 📋 상위 페이지 테이블
- 🔄 날짜 범위 필터