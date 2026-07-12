# goodman-gls-masking-removal Design Document

> **Summary**: worktree 격리 소스로 Vercel 클라우드 preview 빌드(마스킹 제거 상태)를 검증 → 통과 시 단일 커밋(vercel.json + CLAUDE.md D1~D3) → 사용자 승인 후 클린 worktree에서 prod 배포
>
> **Project**: goodman-gls
> **Version**: 0.1.0
> **Author**: jhlim725
> **Date**: 2026-07-12
> **Status**: Draft
> **Planning Doc**: [goodman-gls-masking-removal.plan.md](../../01-plan/features/goodman-gls-masking-removal.plan.md)

---

## 1. Overview

### 1.1 Design Goals

1. **검증의 결정성**: 실제 배포 인프라(Vercel linux + Node 24)에서 마스킹 없는 `next build`를 실행 — 로컬(macOS, 불가 확정)과 추정을 모두 배제
2. **사용자 작업 격리**: 미커밋 변경 3파일(AGENTS.md·DESIGN.md·copy.md)이 업로드·커밋에 섞이지 않도록 **git worktree**에서만 배포
3. **프로덕션 무영향 검증**: preview 배포는 prod alias(goodman-gls.vercel.app)에 영향 없음. prod 승격은 별도 명시 단계 + 사용자 승인

### 1.2 Design Principles

- 코드 변경 0줄 — `vercel.json` 1줄 + CLAUDE.md 문서 정정만
- 각 게이트는 이전 게이트 PASS 전제 (§2.2)
- 커밋·prod 배포 전 사용자에게 diff/실행 내용 제시 (자동 커밋 금지 규칙)

---

## 2. Architecture

### 2.1 Component Diagram

```
메인 체크아웃 (~/Developer/Projects/goodman-gls)
│  미커밋 사용자 변경 3파일 — 불변·비업로드
│
├─ git worktree add (detached @ HEAD 8192270)
│        │
│        ▼
│   W-worktree (scratchpad)          Vercel (goodman-ksways)
│   vercel.json 만 수정  ──vercel deploy──▶  Preview 빌드 (linux·Node 24)
│   ("next build")                    │ buildCommand = 업로드된 vercel.json
│                                     ▼
│                          Ready(PASS) / Error(FAIL→Exit-M)
│
└─ (PASS 시) 메인 체크아웃에서 vercel.json+CLAUDE.md 만 stage → 커밋·push(승인 후)
   → 새 HEAD로 fresh worktree → vercel --prod (승인 후) → health check
```

### 2.2 게이트 순서

```
W0 사전점검: git fetch drift·gh pr 확인(concurrent-push 메모리) + 미커밋 3파일 스냅샷 + vercel teams 재확인
W1 worktree 생성(detached HEAD) + vercel.json 마스킹 제거 편집
W2 worktree를 Vercel 프로젝트에 링크 (goodman-ksways/goodman-gls)
W3 vercel deploy (preview) → 배포 URL 확보
W4 [핵심 판정] 배포 status = Ready → PASS / Error → 빌드 로그 수집 → Exit-M
W5 (PASS) 메인 체크아웃: vercel.json + CLAUDE.md D1~D3 수정 → 로컬 게이트(lint·tsc·vitest) → diff 제시 → 사용자 승인 → 커밋·push (vercel.json, CLAUDE.md, .commit_message.txt 만 stage)
W6 (사용자 승인) 새 HEAD fresh worktree에서 vercel --prod
W7 prod Ready + 4 라우트(/, /company, /services, /network) HTTP 200 + 마스킹 제거 빌드로그 확인
```

### 2.3 Dependencies

| Component | Depends On | Purpose |
|-----------|-----------|---------|
| W3 preview | W1·W2 (worktree + 링크) | 클린 소스 업로드 |
| W4 판정 | W3 URL | 성패 분기점 |
| W5 커밋 | W4 PASS + 사용자 승인 | 근거 확보 후 적용 |
| W6 prod | W5 push 완료 + 사용자 승인 | 외부 노출 액션 |
| W7 검증 | W6 | 배포 후 안전망 |

---

## 3. 변경 파일 명세

### 3.1 `vercel.json` (W5)

```diff
 {
   "framework": "nextjs",
-  "buildCommand": "next build || true"
+  "buildCommand": "next build"
 }
```

### 3.2 `CLAUDE.md` (W5, D1~D3)

| ID | 위치 | 변경 |
|----|------|------|
| D1 | "Deploy Configuration" + 주의 문단 (2곳) | `vercel.com/goodman-jways/goodman-gls` → `vercel.com/goodman-ksways/goodman-gls` (팀 개명 반영) |
| D2 | "Deploy workflow" | "automatic on push to `main`" → "CLI 수동 배포: `vercel --prod --scope goodman-ksways` (git 연동은 goodmangls org 이전 후 미복구 — 별도 debt)" |
| D3 | Quick Start "Build note" + Key Files `vercel.json` 행 | 마스킹 제거 반영: "`\|\| true` 제거됨(2026-07-12, Vercel preview 검증) — **로컬 macOS 빌드는 여전히 실패**(framework debt, Next 16.3 대기). 향후 Vercel 빌드가 upstream 사유로 깨지면 임시 재마스킹 가능(아카이브 참조)" |

**불변**: `AGENTS.md`(사용자 미커밋 변경 중 — 미러 동기화는 사용자 작업 완료 후), src/ 전체, 그 외 문서.

### 3.3 `.commit_message.txt` (W5)

한 줄: 마스킹 제거 + 문서 정정 요약 (이모지 + 한국어, repo 규칙).

---

## 4. 실행 커맨드 명세

```bash
# W0 사전점검
cd ~/Developer/Projects/goodman-gls
git fetch origin && git status -sb          # drift 확인 (main...origin/main)
gh pr list --repo goodmangls/goodman        # 열린 PR 확인
git status --short                          # 미커밋 3파일 스냅샷 (사이클 종료 시 동일해야 함)

# W1 worktree (scratchpad 경로 사용)
WT=/private/tmp/claude-501/-Users-jaehong/9ecf95de-9903-490e-8e69-4d43a0cc29d9/scratchpad/gls-masking-wt
git worktree add --detach "$WT" HEAD
#   → $WT/vercel.json 을 Edit: "next build || true" → "next build"

# W2 링크 (worktree에는 .vercel/ 없음 — gitignored)
cd "$WT" && vercel link --yes --project goodman-gls --scope goodman-ksways

# W3 preview 배포 (비-prod)
vercel deploy --scope goodman-ksways        # → https://goodman-xxxx-goodman-ksways.vercel.app

# W4 판정
vercel inspect <preview-url> --logs --scope goodman-ksways   # 빌드 로그 (next build, prerender 라우트)
vercel ls goodman-gls --scope goodman-ksways | head -3       # status Ready/Error

# W5 (PASS·승인 후) 메인 체크아웃 적용 — worktree 아님
cd ~/Developer/Projects/goodman-gls
#   vercel.json·CLAUDE.md Edit → npm run lint && npx tsc --noEmit && npm run test:run
git add vercel.json CLAUDE.md .commit_message.txt && git commit && git push origin main

# W6 (승인 후) prod — 새 커밋 기준 fresh worktree
git worktree remove "$WT" --force && git worktree add --detach "$WT" HEAD
cd "$WT" && vercel link --yes --project goodman-gls --scope goodman-ksways
vercel --prod --scope goodman-ksways

# W7 health check
for r in "" company services network; do curl -s -o /dev/null -w "%{http_code} /$r\n" "https://goodman-gls.vercel.app/$r"; done

# 정리
git worktree remove "$WT" --force
```

---

## 5. UI/UX Design

N/A — 설정/문서 사이클.

---

## 6. Error Handling (Exit 조건)

| ID | 트리거 | 처리 |
|----|--------|------|
| **Exit-M** | W4 FAIL (preview 빌드 Error) | 커밋 0건 종료. 빌드 로그(어느 라우트·어떤 오류)를 Analysis에 기록 + prerender-debt 아카이브와 대조(/_global-error 재현인지, /company류 신규인지). 마스킹 유지, Next 16.3 대기 결론 유지 |
| **Exit-P** | W7 FAIL (prod 이상: Ready 아님 또는 라우트 4xx/5xx) | Vercel 대시보드/`vercel rollback`으로 직전 프로덕션 복귀 → 원인 로그 수집. vercel.json 커밋은 유지 여부 로그 보고 판단(빌드는 W4서 검증됐으므로 배포 인프라 이슈 가능성 우선 조사) |
| W2 링크 실패 | 프로젝트/권한 문제 | `vercel projects ls`로 프로젝트명 재확인, 1회 재시도 후 사용자 보고 |
| W0 drift 발견 | origin/main 선행 커밋 존재 | 메모리 concurrent-push 결정트리 적용 (pull rebase 후 진행) |
| 사용자 승인 거부 (W5/W6) | — | 해당 게이트에서 중단, 이전 산출물(preview 검증 결과)은 Analysis에 보존 |

---

## 7. Security Considerations

- [x] preview 배포 URL은 비공개 성격이나 외부 접근 가능 — 소스는 HEAD 기준(이미 public 사이트로 배포된 코드), 시크릿 미포함
- [x] env 시크릿 취급 없음 — Vercel 프로젝트 env는 그대로 (ALLOWED_ORIGINS 등 불변)
- [x] prod 배포는 사용자 승인 후 (외부 노출 액션 규칙)
- [x] 업로드 소스에서 사용자 미커밋 파일 배제 (worktree = HEAD 스냅샷)

---

## 8. Test Plan

| Type | Target | 판정 기준 |
|------|--------|----------|
| 핵심 | W4 preview 빌드 | status **Ready** + 로그에 마스킹 없는 `next build` 완주 (Generating static pages 완료, `/_global-error` 오류 없음) |
| 회귀(로컬) | lint·tsc·vitest | 0 err · 0 err · 17/17 (커밋 전, Node 22) |
| 격리 | 사용자 미커밋 3파일 | 사이클 전후 `git status` 동일, diff 0 |
| 배포 | W7 prod | Ready + 4 라우트 200 |
| 사후 안전망 | rollback 경로 | `vercel rollback` 가용 확인 (직전 prod 배포 7건 Ready 존재) |

---

## 9. Clean Architecture

N/A — 소스 코드 레이어 변경 없음.

---

## 10. Coding Convention Reference

| Item | Convention Applied |
|------|-------------------|
| 커밋 | 단일 커밋 (repo 전례: 사이클당 single commit 패턴), conventional + 이모지, `.commit_message.txt` 갱신 |
| 브랜치 | main 직접 push (repo 전례 Option B — 변경 극소 + 리스크 Resolved 시), push 전 drift 재점검 |
| 승인 | 커밋(W5)·prod(W6) 각각 사용자 확인 후 실행 |

---

## 11. Implementation Guide

### 11.1 File Structure (변경분)

```
goodman-gls/
├── vercel.json          # buildCommand: "next build" (|| true 제거)
├── CLAUDE.md            # D1 스코프명 ×2 / D2 배포방식 / D3 build note+Key Files
└── .commit_message.txt  # 갱신
```

### 11.2 Implementation Order

1. [ ] W0 사전점검 (drift·PR·미커밋 스냅샷·teams)
2. [ ] W1~W3 worktree → 링크 → preview 배포
3. [ ] W4 판정 — **성패 분기점** (FAIL → Exit-M)
4. [ ] W5 파일 수정 + 로컬 게이트 + **사용자 승인** → 커밋·push
5. [ ] W6 **사용자 승인** → fresh worktree → prod 배포
6. [ ] W7 health check + worktree 정리

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-07-12 | Initial draft — worktree 격리 확정, W0~W7 + Exit-M/P 설계 | jhlim725 |
