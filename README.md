# Mini Box

Supabase Storage 기반 이미지 저장소 애플리케이션

## 주요 기능

- 드래그 앤 드롭 / 클릭으로 이미지 업로드
- 다중 파일 동시 업로드 지원
- 이미지 검색 (원본 파일명 기준)
- 이미지 삭제
- 한글 파일명 지원

## 기술 스택

- **Framework**: Next.js 16
- **Backend**: Supabase Storage
- **State Management**: TanStack React Query
- **UI Components**: Radix UI, shadcn/ui
- **Styling**: Tailwind CSS v4
- **File Upload**: react-dropzone

## 시작하기

### 환경 변수 설정

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=your_bucket_name
NEXT_SUPABASE_SERVICE_ROLE=your_service_role_key
```

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

http://localhost:3000 에서 확인할 수 있습니다.

## 프로젝트 구조

```
mini-box/
├── actions/              # Server Actions
│   └── storageActions.ts # 파일 업로드/검색/삭제
├── app/                  # Next.js App Router
│   ├── layout.tsx        # 루트 레이아웃
│   ├── page.tsx          # 메인 페이지
│   └── ui.tsx            # UI 컴포넌트
├── components/           # React 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트
│   ├── cardList.tsx      # 이미지 목록
│   ├── dragDropZone.tsx  # 파일 업로드 영역
│   └── imageCard.tsx     # 이미지 카드
├── config/               # 설정
│   └── QueryClientProvider.tsx
└── utils/supabase/       # Supabase 클라이언트
    ├── client.ts         # 브라우저 클라이언트
    ├── server.ts         # 서버 클라이언트
    └── storage.ts        # 스토리지 유틸리티
```

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 실행 |
| `npm run generate-types` | Supabase 타입 생성 |
