# VOID. - React Mini Study

React와 TypeScript를 학습하기 위한 다양한 미니 프로젝트를 포함한 저장소입니다.

## 프로젝트 소개

이 프로젝트는 실전 React 개발 경험을 쌓기 위해 만든 학습용 저장소로, 다양한 웹 애플리케이션 기능들을 구현하고 있습니다.

## 기술 스택

- **React** 18.2.0 - UI 라이브러리
- **TypeScript** 5.8.3 - 타입 안전성
- **Vite** 7.0.0 - 빌드 도구
- **Styled Components** 6.1.19 - CSS-in-JS 스타일링
- **React Quill** 2.0.0 - 리치 텍스트 에디터

## 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/winterholic/react-mini-study.git

# 프로젝트 디렉토리 이동
cd react-mini-study

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 주요 기능

### 1. 인증 시스템
- **로그인/회원가입** (`/login`, `/signup`)
  - 사용자 인증 및 회원가입 기능
  - 개인정보 처리방침 및 이용약관 동의
  - LocalStorage 기반 인증 관리

### 2. 쇼핑몰 (`/shopping`)
- **제품 목록**
  - 카테고리별 필터링 (전체/아우터/상의/하의/신발)
  - 가격별 정렬 (기본/높은가격/낮은가격)
  - 할인율 표시 및 가격 정보
- **장바구니** (`/shopping/cart`)
  - 제품 추가/수량 조절/삭제
  - 총 금액 계산
- **위시리스트** (`/shopping/wishlist`)
  - 관심 상품 저장 및 관리

**데이터 정보**:
- 이미지: Unsplash 무료 이미지 사용 (상업적 이용 가능)
- 브랜드명: 모두 가상의 브랜드명으로 구성 (저작권 문제 없음)

### 3. 블로그 (`/blog`)
- **블로그 메인**
  - 게시글 목록 조회
  - 카테고리별 필터링
- **글 작성** (`/blog/write`)
  - React Quill 기반 리치 텍스트 에디터
  - 제목, 카테고리, 썸네일 설정

### 4. 컴포넌트 라이브러리 (`/component`)

재사용 가능한 UI 컴포넌트 쇼케이스

#### 폼 컴포넌트
- **InputField** - 라벨, 에러 메시지, 도움말 텍스트 지원
- **TextArea** - 다중 줄 텍스트 입력
- **SelectBox** - 드롭다운 선택 박스
- **CheckBox** - 커스텀 디자인 체크박스
- **RadioButton** - 커스텀 디자인 라디오 버튼
- **ToggleSwitch** - 3가지 크기의 토글 스위치

#### 버튼 컴포넌트
- **LargeButton** - 5가지 variant (primary, secondary, outline, ghost, danger)
- **SmallButton** - 3가지 크기 (xs, sm, md)

#### UI 컴포넌트
- **Card** - 4가지 variant (default, elevated, outlined, filled)
- **Badge** - 6가지 색상과 3가지 크기
- **Progress** - 애니메이션과 스트라이프 효과 지원
- **ProductCard** - 쇼핑몰용 제품 카드

#### 피드백 컴포넌트
- **Alert** - 4가지 타입 (info, success, warning, error)
- **Message** - 간단한 메시지 표시
- **Loader** - 4가지 애니메이션 (spinner, dots, pulse, bars)

#### 인터랙티브 컴포넌트
- **Modal** - 4가지 크기의 모달 다이얼로그
- **TermsModal** - 약관 동의용 모달
- **Tooltip** - 4방향 툴팁 (위, 아래, 왼쪽, 오른쪽)
- **Accordion** - 접을 수 있는 아코디언
- **Pagination** - 스마트한 페이지 번호 표시

### 5. 미니 프로젝트들
- **LoveHelper** (`/lovehelper`) - 연애 관련 도우미 앱
- **MemeMeme** (`/meme`) - 밈 생성기
- **FMNetherlands** (`/netherlands`) - FM 네덜란드 관련 페이지

### 6. 관리자 페이지 (`/admin`)
- 관리자 전용 대시보드 및 관리 기능

## 프로젝트 구조

```
react-mini-study/
├── src/
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   │   ├── Alert.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── CheckBox.tsx
│   │   ├── InputField.tsx
│   │   ├── LargeButton.tsx
│   │   ├── Loader.tsx
│   │   ├── Modal.tsx
│   │   ├── Pagination.tsx
│   │   ├── ProductCard.tsx
│   │   ├── Progress.tsx
│   │   ├── RadioButton.tsx
│   │   ├── SelectBox.tsx
│   │   ├── SmallButton.tsx
│   │   ├── TextArea.tsx
│   │   ├── TermsModal.tsx
│   │   ├── ToggleSwitch.tsx
│   │   ├── Tooltip.tsx
│   │   ├── Accordion.tsx
│   │   ├── Message.tsx
│   │   └── ComponentShowcase.tsx
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── home/           # 홈페이지
│   │   ├── shopping/       # 쇼핑몰 (Shopping, Cart, Wishlist)
│   │   ├── blog/           # 블로그 (Blog, WritePost)
│   │   ├── component/      # 컴포넌트 쇼케이스
│   │   ├── login/          # 로그인
│   │   ├── signup/         # 회원가입
│   │   ├── admin/          # 관리자
│   │   ├── lovehelper/     # 연애 도우미
│   │   ├── meme/           # 밈 생성기
│   │   └── fmnetherlands/  # FM 네덜란드
│   ├── data/               # 정적 데이터
│   │   └── products.json   # 쇼핑몰 제품 데이터
│   ├── utils/              # 유틸리티 함수
│   │   └── auth.ts         # 인증 관련 함수
│   ├── styles/             # 스타일 관련
│   │   └── media.ts        # 미디어 쿼리
│   ├── App.tsx             # 메인 앱 컴포넌트 (라우팅)
│   └── main.tsx            # 진입점
├── public/                 # 정적 파일
│   └── VOIDDOT.svg        # 로고
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 라우팅 구조

```
/ ............................ 홈페이지 (VOID. 포털)
/login ....................... 로그인
/signup ...................... 회원가입
/shopping .................... 쇼핑몰 메인
/shopping/cart ............... 장바구니
/shopping/wishlist ........... 위시리스트
/blog ........................ 블로그 메인
/blog/write .................. 글 작성
/component ................... 컴포넌트 쇼케이스
/lovehelper .................. 연애 도우미
/meme ........................ 밈 생성기
/netherlands ................. FM 네덜란드
/admin ....................... 관리자 페이지
```

## 코드 예시

### 컴포넌트 사용 예시

```tsx
import { LargeButton, Card, InputField } from './components';

function Example() {
  return (
    <Card variant="elevated" padding="lg">
      <InputField
        label="이메일"
        placeholder="이메일을 입력하세요"
        helperText="회원가입에 사용됩니다"
      />
      <LargeButton variant="primary" size="lg">
        제출하기
      </LargeButton>
    </Card>
  );
}
```

### 인증 사용 예시

```tsx
import { isAuthenticated, login, logout } from './utils/auth';

// 로그인 확인
if (isAuthenticated()) {
  // 인증된 사용자
}

// 로그인
login({ username: 'user', password: 'pass' });

// 로그아웃
logout();
```

## 학습 포인트

이 프로젝트를 통해 다음을 학습할 수 있습니다:

1. **React 기초**
   - 컴포넌트 구조 설계
   - Props와 State 관리
   - 이벤트 핸들링

2. **TypeScript**
   - 인터페이스 정의
   - 타입 안전성 확보
   - Props 타입 지정

3. **상태 관리**
   - useState를 활용한 로컬 상태 관리
   - useEffect를 활용한 부수 효과 처리
   - LocalStorage를 활용한 데이터 영속성

4. **스타일링**
   - Styled Components
   - 반응형 디자인
   - 동적 스타일링

5. **라우팅**
   - 경로 기반 컴포넌트 렌더링
   - 인증 기반 페이지 보호

6. **폼 처리**
   - 입력 값 검증
   - 폼 제출 처리
   - 에러 처리

7. **데이터 관리**
   - JSON 데이터 활용
   - 필터링 및 정렬
   - CRUD 작업

## 주요 특징

- **접근성**: ARIA 속성, 키보드 네비게이션 지원
- **반응형**: 모바일부터 데스크톱까지 대응
- **타입 안전성**: TypeScript로 작성된 모든 컴포넌트
- **재사용성**: 독립적이고 재사용 가능한 컴포넌트 구조
- **모던 UI**: 그라디언트, 애니메이션 등 현대적인 디자인
- **저작권 준수**: 모든 리소스 상업적 사용 가능

## 배포 준비사항

이 프로젝트는 배포 가능한 상태로 구성되어 있습니다:

- 이미지: Unsplash 무료 이미지 (상업적 이용 가능)
- 브랜드명: 가상의 브랜드명 사용 (저작권 문제 없음)
- 빌드: `npm run build`로 프로덕션 빌드 가능

### 배포 플랫폼 예시

- **Vercel**: Git 저장소 연결만으로 자동 배포
- **Netlify**: 드래그 앤 드롭으로 간편 배포
- **GitHub Pages**: GitHub Actions로 자동 배포 설정 가능

## 기여하기

1. 이 저장소를 포크하세요
2. 새로운 기능 브랜치를 만드세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다. 자유롭게 사용하고 수정할 수 있습니다.

## 문의

이슈나 질문이 있으시면 GitHub Issues를 활용해주세요.

---

⭐ 이 저장소가 도움이 되었다면 스타를 눌러주세요!
