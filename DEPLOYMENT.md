# Vercel 배포 가이드

이 프로젝트를 Vercel을 통해 무료로 배포하는 방법을 안내합니다.

## 사전 준비

1. **GitHub 계정** - 코드를 GitHub에 푸시해야 합니다
2. **Vercel 계정** - GitHub 계정으로 로그인 가능합니다

## 배포 단계

### 1단계: GitHub에 코드 푸시하기

프로젝트가 이미 GitHub에 있다면 이 단계를 건너뛰세요.

```bash
# 변경사항 커밋
git add .
git commit -m "Prepare for Vercel deployment"

# GitHub에 푸시
git push origin main
```

### 2단계: Vercel 계정 생성 및 로그인

1. [Vercel 웹사이트](https://vercel.com) 방문
2. "Sign Up" 클릭
3. "Continue with GitHub" 선택
4. GitHub 계정으로 로그인 및 권한 승인

### 3단계: 프로젝트 Import

1. Vercel 대시보드에서 **"Add New..."** 버튼 클릭
2. **"Project"** 선택
3. **"Import Git Repository"** 섹션에서 GitHub 저장소 찾기
4. `react-mini-study` 저장소 옆의 **"Import"** 클릭

### 4단계: 프로젝트 설정

Vercel이 자동으로 Vite 프로젝트를 감지합니다:

- **Framework Preset**: Vite (자동 감지)
- **Root Directory**: `./` (기본값)
- **Build Command**: `npm run build` (자동 설정)
- **Output Directory**: `dist` (자동 설정)
- **Install Command**: `npm install` (자동 설정)

**설정을 확인하고 그대로 두세요!**

### 5단계: 배포하기

1. 모든 설정 확인 후 **"Deploy"** 버튼 클릭
2. Vercel이 자동으로:
   - 의존성 설치 (`npm install`)
   - 프로젝트 빌드 (`npm run build`)
   - 배포 수행
3. 약 1-3분 후 배포 완료!

### 6단계: 배포된 사이트 확인

배포가 완료되면:
- 자동으로 생성된 URL 제공 (예: `https://your-project.vercel.app`)
- **"Visit"** 버튼을 클릭하여 사이트 확인
- URL을 친구들과 공유 가능!

## 자동 배포 설정

Vercel은 GitHub와 자동으로 연동됩니다:

- **main 브랜치에 푸시** → 자동으로 프로덕션 배포
- **다른 브랜치에 푸시** → 자동으로 프리뷰 배포
- **Pull Request 생성** → 자동으로 프리뷰 배포 생성

## 커스텀 도메인 설정 (선택사항)

무료 플랜에서도 커스텀 도메인을 사용할 수 있습니다:

1. Vercel 프로젝트 대시보드 → **"Settings"** 탭
2. **"Domains"** 섹션
3. 도메인 입력 및 DNS 설정 안내 따르기

## 환경 변수 설정 (필요시)

프로젝트에 환경 변수가 필요한 경우:

1. Vercel 프로젝트 대시보드 → **"Settings"** 탭
2. **"Environment Variables"** 섹션
3. 변수 이름과 값 입력
4. 재배포 (자동으로 적용됨)

## 설정 파일 설명

### `vercel.json`

이 파일은 SPA(Single Page Application) 라우팅을 위한 설정입니다:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

- 모든 경로(`/shopping`, `/blog` 등)를 `index.html`로 리다이렉트
- React의 클라이언트 사이드 라우팅이 정상 작동하도록 보장
- 새로고침 시 404 에러 방지

## 문제 해결

### 빌드 실패 시

로컬에서 빌드를 테스트하세요:

```bash
npm run build
```

에러가 있다면 먼저 로컬에서 해결 후 다시 배포하세요.

### 페이지가 404 에러를 표시하는 경우

- `vercel.json` 파일이 제대로 커밋되었는지 확인
- Vercel 대시보드에서 재배포 시도

### 환경 변수가 작동하지 않는 경우

- 환경 변수 이름이 `VITE_`로 시작하는지 확인 (Vite 규칙)
- Vercel 설정에서 올바르게 입력했는지 확인
- 재배포 필요

## Vercel 무료 플랜 제한사항

- **대역폭**: 월 100GB
- **빌드 시간**: 월 100시간
- **배포 수**: 무제한
- **팀 멤버**: 1명 (Hobby 플랜)
- **도메인**: 무제한

대부분의 개인 프로젝트와 포트폴리오에는 충분합니다!

## 추가 리소스

- [Vercel 공식 문서](https://vercel.com/docs)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)
- [Vercel CLI](https://vercel.com/docs/cli) - 터미널에서 배포

## 빠른 배포 (CLI 사용)

터미널에서 직접 배포하려면:

```bash
# Vercel CLI 설치
npm install -g vercel

# 프로젝트 폴더에서 실행
vercel

# 프로덕션 배포
vercel --prod
```

---

배포 후 생성된 URL을 README에 추가하는 것을 잊지 마세요!
