## 포트폴리오 사이트

비전, 기술 스택, 프로젝트 및 이력이 담겼습니다.
[👉 사이트 바로가기](https://portfolio-tau-self-99.vercel.app/)

<img width="1238" height="741" alt="스크린샷 2026-01-17 오전 8 57 14" src="https://github.com/user-attachments/assets/4c839a6b-8361-4052-b21f-2b6eb58fa519" />
<img width="1244" height="624" alt="스크린샷 2026-01-17 오전 8 58 13" src="https://github.com/user-attachments/assets/4484cf0b-6854-4ebc-918f-f875cd787beb" />

### 사용 스택

- Front: Next.js, Typescript
- DB: Firestore database
- Auth: Firebase Authentication (관리자 페이지용)

### 관리자 페이지

`/admin` 경로에서 프로젝트와 경력 데이터를 UI로 관리할 수 있습니다.

- `/admin/login` — 이메일/비밀번호 로그인
- `/admin/projects` — 프로젝트 목록·생성·수정·삭제
- `/admin/experience` — 경력 목록·생성·수정·삭제

#### 초기 셋업

1. Firebase Console → Authentication → Sign-in method에서 **이메일/비밀번호** 활성화
2. Authentication → Users 에서 관리자 계정을 추가 (예: `me@example.com`)
3. `.env.local` 환경변수 설정 (아래)

#### 필요 환경변수

```bash
# firebase-admin (서버) — 기존
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# firebase 클라이언트 SDK (Auth용) — 신규
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_APP_ID=...

# 관리자 허용 이메일 (쉼표 구분)
ADMIN_EMAILS=me@example.com
```

`ADMIN_EMAILS`에 포함된 이메일만 로그인 후 세션이 발급됩니다. Vercel에 배포 시 동일한 환경변수를 추가하세요.
