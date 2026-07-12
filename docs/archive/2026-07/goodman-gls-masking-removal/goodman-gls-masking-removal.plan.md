# goodman-gls-masking-removal Planning Document

> **Summary**: `vercel.json`의 `next build || true` 마스킹을 Vercel 클라우드 preview 빌드로 검증 후 제거 — 실제 빌드 게이트 복원 + 낡은 배포 문서(CLAUDE.md) 정정
>
> **Project**: goodman-gls
> **Version**: 0.1.0
> **Author**: jhlim725
> **Date**: 2026-07-12
> **Status**: Draft

---

## 1. Overview

### 1.1 Purpose

`vercel.json`의 `"buildCommand": "next build || true"` 마스킹은 2026-05-29 prerender-debt 사이클에서 Vercel auto-deploy 차단을 막기 위한 임시 조치였다. 이 마스킹은 **빌드 실패를 침묵시키므로** 향후 진짜 빌드 오류(코드 결함)도 그대로 배포를 통과시키는 silent-failure 위험이다. 이 사이클의 목적:

1. **검증**: 마스킹 없는 `next build`가 Vercel 인프라(linux + Node 24)에서 통과하는지 클라우드 preview 빌드로 확인
2. **복원**: 통과 시 `|| true` 제거 커밋 → 실제 빌드 게이트(fail-fast) 복원
3. **문서 정정**: CLAUDE.md 배포 설정의 낡은 기재 3건 수정 (§1.2 발견 사항)

### 1.2 Background

**마스킹 제거가 가능하다고 판단하는 근거 (2026-07-12 확보)**:
- **ksways-web = 살아있는 증거**: 동일 스택 계열(Next 16.2.9 + React 19.2.3)이 Vercel(Node 24.x, linux)에서 **마스킹 없이** `npm run build`로 배포 전부 Ready
- goodman-gls Vercel 프로젝트도 Node 24.x 설정 확인됨 (스코프 `goodman-ksways`)
- goodman-gls의 최근 프로덕션 배포 7건 전부 Ready (15~22일 전, 15~19s) — 현재도 Vercel 빌드는 사실상 통과 중으로 추정 (마스킹은 dead weight)

**로컬 검증이 불가능한 이유 (전 사이클 ksways-web#1 node24-build-fix 확정)**:
- macOS에서는 Node 22·24 모두 `/_global-error` prerender 실패 — Node 버전 무관 framework debt
- 따라서 검증 게이트는 **Vercel 클라우드 빌드**여야 함

**이 계획 수립 중 발견한 낡은 문서 3건 (CLAUDE.md "Deploy Configuration")**:
| # | 기재 | 실제 |
|---|------|------|
| D1 | 대시보드 `vercel.com/goodman-jways/goodman-gls` | `goodman-jways` 팀 스코프는 더 이상 존재하지 않음 — KS Ways 리브랜딩으로 **`goodman-ksways`** 로 변경된 것으로 추정 (`vercel teams ls` 확인) |
| D2 | "Deploy workflow: automatic on push to `main`" | 최근 배포 7건이 마지막 커밋(6/3)보다 늦음(6/20~27) = **CLI 수동 배포**. git 연동 auto-deploy는 org 이전 후 미복구 (메모리 2026-06-04) |
| D3 | Build note "`\|\| true` 마스킹 유지" | 본 사이클 성공 시 제거로 갱신 필요 |

**주의 — 리포 현황**: `AGENTS.md`, `DESIGN.md`, `copy.md`에 사용자의 커밋 안 된 변경이 있음 (다른 작업 진행 중). 본 사이클은 이 파일들을 건드리지 않는다.

### 1.3 Related Documents

- 전례: `docs/archive/2026-05/goodman-gls-prerender-debt/` (6-build 매트릭스, 마스킹 도입 경위)
- 직전 사이클: ksways-web `docs/archive/2026-07/node24-build-fix/` (Node 가설 반증, 본 사이클 후보 도출)

---

## 2. Scope

### 2.1 In Scope

- [ ] **검증**: 마스킹 제거 상태의 클라우드 preview 배포 (`vercel deploy`, non-prod) → Vercel 빌드 로그에서 실제 `next build` exit 0 확인
- [ ] 검증 통과 시 `vercel.json` `"next build || true"` → `"next build"` 커밋
- [ ] CLAUDE.md 배포 문서 정정 (D1 스코프명 / D2 배포 방식 / D3 build note)
- [ ] 프로덕션 배포 (`vercel --prod --scope goodman-ksways`) + Ready·핵심 라우트 health check — **사용자 확인 후 실행** (외부 노출 액션)
- [ ] 검증 실패 시: 마스킹 유지 + 실패 로그 문서화 + Next 16.3 대기 결론 유지 (Exit 경로)

### 2.2 Out of Scope

- Vercel git 연동 auto-deploy 복구 — 별도 debt (메모리 `goodmangls-vercel-integration-broken`, 8개 repo 공통)
- 로컬 macOS 빌드 해소 — 반증 완료 (Next 16.3 stable 대기)
- Next.js 16.3 / React 19.3 업그레이드
- `AGENTS.md` 미러 동기화 — 사용자 미커밋 변경 있음, 사용자 작업 완료 후 별도 처리
- smart-quote 계열 repo의 스코프명 문서 갱신 — 메모리에만 기록, 각 repo 사이클에서 처리

---

## 3. Requirements

### 3.1 Functional Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-01 | 클린 소스(HEAD + vercel.json 수정만)로 클라우드 preview 배포 — 사용자 미커밋 변경(AGENTS.md 등) 업로드 배제 | High | Pending |
| FR-02 | preview 빌드 로그에서 `next build` 실제 통과 확인 (마스킹 없이 exit 0, `/_global-error` 포함 전 라우트 prerender) | High | Pending |
| FR-03 | (FR-02 PASS 조건부) `vercel.json` 마스킹 제거 + CLAUDE.md D1~D3 정정, 단일 커밋 | High | Pending |
| FR-04 | (FR-03 후) 프로덕션 배포 + Ready 확인 + 핵심 라우트(/, /company, /services, /network) 200 확인 — 사용자 승인 후 | Medium | Pending |
| FR-05 | 결과(성공/실패 무관)를 prerender-debt 아카이브 참조와 함께 기록, 메모리 갱신 | Medium | Pending |

### 3.2 Non-Functional Requirements

| Category | Criteria | Measurement Method |
|----------|----------|-------------------|
| 프로덕션 안전 | 검증은 preview 전용 — prod alias 무영향 | `vercel deploy`(non-prod)만 사용, prod 승격은 별도 명시 단계 |
| 사용자 작업 격리 | 미커밋 변경 3파일 불변 | `git status` 사전/사후 diff 0 |
| 회귀 안전 | lint·tsc·vitest 기존 GREEN 유지 (로컬, Node 22) | 커밋 전 재실행 |

---

## 4. Success Criteria

### 4.1 Definition of Done

- [ ] Preview 빌드가 마스킹 없이 PASS (Vercel 빌드 로그 증거)
- [ ] `vercel.json` `"buildCommand": "next build"` 커밋 (main)
- [ ] CLAUDE.md D1~D3 정정 커밋
- [ ] 프로덕션 배포 Ready + 4개 라우트 200
- [ ] 실패 시: Exit 문서화로 대체 (마스킹 유지 + 로그 + 결론)

### 4.2 Quality Criteria

- [ ] 사용자 미커밋 파일 변경 0
- [ ] Zero lint errors (기존 유지)
- [ ] 테스트 17/17 유지 (api-guards) — 코드 로직 변경 없는 설정/문서 사이클

---

## 5. Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Preview 빌드 실패 — goodman-gls는 ksways-web에 없는 요소 보유 (next-themes Providers, next-intl, /company-class 페이지: 2026-05 매트릭스에서 React 19.1 시 /company fail 이력) | High | Low~Medium | Exit 경로: 마스킹 유지, 실패 로그를 prerender-debt 아카이브에 추가 기록, Next 16.3 대기. 커밋 0건 종료 |
| `vercel deploy`가 작업 디렉토리를 업로드해 사용자 미커밋 변경 유출 | Medium | Medium | FR-01: **git worktree(HEAD 분리 체크아웃)에서 배포** — vercel.json 수정만 적용. Design에서 절차 확정 |
| 마스킹 제거 후 미래 빌드 실패 시 배포 차단 (fail-fast의 이면) | Medium | Low | 그것이 목적(silent-failure 제거). CLAUDE.md에 unblock 절차(마스킹 임시 복원) 기록 |
| prod 배포 중 사이트 이상 | High | Low | preview 검증 선행 + prod는 사용자 승인 후 + 배포 직후 4-라우트 health check, 이상 시 Vercel 대시보드 instant rollback |
| 스코프명 추가 변동 (goodman-ksways 재확인 필요) | Low | Low | Do 시작 시 `vercel teams ls` 재확인 |

---

## 6. Architecture Considerations

애플리케이션 아키텍처 변경 없음 — 설정 1파일(`vercel.json`) + 문서 1파일(CLAUDE.md).

| Decision | Options | Selected | Rationale |
|----------|---------|----------|-----------|
| 검증 게이트 | 로컬 빌드 / GitHub CI / Vercel 클라우드 빌드 | **Vercel 클라우드 preview** | 로컬 불가(반증 완료), CI 부재, 실제 배포 인프라와 동일 환경이 가장 결정적 |
| 소스 격리 | 작업 디렉토리 직접 deploy / worktree | Design에서 확정 (worktree 권장) | 미커밋 사용자 변경 보호 |

---

## 7. Convention Prerequisites

- [x] CLAUDE.md 존재 (배포 문서 포함 — 본 사이클이 일부 정정)
- [x] ESLint/TypeScript/Vitest 설정 존재
- [x] `.commit_message.txt` 규칙 적용 대상
- 신규 환경 변수 없음

---

## 8. Next Steps

1. [ ] `/pdca design goodman-gls-masking-removal` — worktree 격리 절차 + preview 빌드 로그 판정 기준 + Exit 조건 상세화
2. [ ] Do: preview 검증 → 조건부 커밋 → 사용자 승인 후 prod
3. [ ] Analyze → Report → Archive

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-07-12 | Initial draft — Vercel preview 게이트 방식, 문서 정정 D1~D3 포함 | jhlim725 |
