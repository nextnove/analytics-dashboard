# 🚀 GitHub Pages 배포 가이드

## ✅ 완료된 수정 사항

### 1. Vite 설정 (vite.config.ts)
```typescript
export default defineConfig(({ mode }) => ({
  // GitHub Pages 배포 시에만 base 적용
  base: mode === 'production' ? '/analytics-dashboard/' : '/',
  // ...
}))
```

**설명:**
- 로컬 개발: `base: '/'` (루트 경로)
- 프로덕션 빌드: `base: '/analytics-dashboard/'` (GitHub Pages 경로)

### 2. Analytics Service 수정
```typescript
// Vite의 base path를 동적으로 가져옵니다
const getDataPath = (filename: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}data/${filename}`;
};
```

**변경 전:**
```typescript
fetch('/data/realtime.json')  // ❌ 하드코딩된 절대 경로
```

**변경 후:**
```typescript
fetch(getDataPath('realtime.json'))  // ✅ 동적 경로
```

## 📋 배포 단계

### 1. 저장소 설정

**GitHub 저장소 생성**
```bash
# 저장소 이름: analytics-dashboard
# Public 저장소로 생성
```

### 2. GitHub Actions 워크플로우 설정

**.github/workflows/deploy.yml 생성**
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

### 3. 로컬에서 빌드 테스트

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 확인
ls dist/

# 로컬에서 프로덕션 빌드 테스트
npx serve dist -s
# http://localhost:3000/analytics-dashboard/ 접속
```

### 4. GitHub에 푸시

```bash
# Git 초기화 (처음인 경우)
git init
git add .
git commit -m "Initial commit with GitHub Pages support"

# 원격 저장소 추가
git remote add origin https://github.com/YOUR_USERNAME/analytics-dashboard.git

# 푸시
git branch -M main
git push -u origin main
```

### 5. GitHub Pages 활성화

1. GitHub 저장소 페이지로 이동
2. **Settings** → **Pages** 클릭
3. **Source**: GitHub Actions 선택
4. 자동으로 배포 시작

### 6. 배포 확인

**배포 URL:**
```
https://YOUR_USERNAME.github.io/analytics-dashboard/
```

**배포 상태 확인:**
- GitHub 저장소 → **Actions** 탭
- 워크플로우 실행 상태 확인

## 🔧 문제 해결

### 404 에러 (데이터 파일을 찾을 수 없음)

**증상:**
```
Failed to fetch: https://YOUR_USERNAME.github.io/data/realtime.json
404 Not Found
```

**원인:**
- `base` 경로가 설정되지 않음
- 하드코딩된 절대 경로 사용

**해결:**
✅ 이미 수정 완료! `getDataPath()` 함수가 자동으로 처리합니다.

### 빈 페이지 또는 CSS 미적용

**증상:**
- 페이지가 비어있거나 스타일이 깨짐

**원인:**
- `vite.config.ts`의 `base` 설정 누락

**해결:**
```typescript
// vite.config.ts
base: mode === 'production' ? '/analytics-dashboard/' : '/',
```

### 라우팅 404 에러

**증상:**
- 새로고침 시 404 에러

**해결:**
GitHub Pages는 SPA를 위한 fallback이 없으므로 `404.html`을 추가:

```html
<!-- public/404.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Analytics Dashboard</title>
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/analytics-dashboard/'">
  </head>
</html>
```

## 🎯 다른 저장소 이름 사용 시

저장소 이름이 `analytics-dashboard`가 아닌 경우:

**1. vite.config.ts 수정**
```typescript
base: mode === 'production' ? '/YOUR_REPO_NAME/' : '/',
```

**2. 빌드 및 배포**
```bash
npm run build
git add .
git commit -m "Update base path"
git push
```

## 📊 배포 후 확인 사항

### 1. 데이터 로딩 확인
- 브라우저 개발자 도구 → Network 탭
- 모든 JSON 파일이 200 OK로 로드되는지 확인

### 2. 경로 확인
```
✅ https://YOUR_USERNAME.github.io/analytics-dashboard/data/realtime.json
❌ https://YOUR_USERNAME.github.io/data/realtime.json
```

### 3. 콘솔 에러 확인
- 브라우저 개발자 도구 → Console 탭
- 404 에러나 CORS 에러가 없는지 확인

## 🔄 업데이트 배포

코드 수정 후 배포:

```bash
# 변경사항 커밋
git add .
git commit -m "Update features"

# 푸시 (자동으로 재배포됨)
git push
```

## 🌐 커스텀 도메인 사용

### 1. CNAME 파일 생성
```bash
# public/CNAME
analytics.yourdomain.com
```

### 2. DNS 설정
```
Type: CNAME
Name: analytics
Value: YOUR_USERNAME.github.io
```

### 3. vite.config.ts 수정
```typescript
base: mode === 'production' ? '/' : '/',  // 커스텀 도메인은 루트 경로
```

## 📝 체크리스트

배포 전 확인:

- [ ] `vite.config.ts`에 `base` 경로 설정
- [ ] `analyticsService.ts`에서 `getDataPath()` 사용
- [ ] `.github/workflows/deploy.yml` 파일 생성
- [ ] `public/data/` 폴더에 모든 JSON 파일 존재
- [ ] 로컬에서 프로덕션 빌드 테스트
- [ ] GitHub 저장소 생성 및 푸시
- [ ] GitHub Pages 활성화
- [ ] 배포 URL 접속 및 테스트

## 🎉 완료!

이제 Analytics Dashboard가 GitHub Pages에 성공적으로 배포되었습니다!

**배포 URL:**
```
https://YOUR_USERNAME.github.io/analytics-dashboard/
```

**자동 배포:**
- `main` 브랜치에 푸시할 때마다 자동으로 재배포됩니다.
- GitHub Actions에서 배포 상태를 확인할 수 있습니다.
