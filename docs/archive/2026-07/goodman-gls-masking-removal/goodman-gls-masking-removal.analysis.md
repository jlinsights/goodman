# goodman-gls-masking-removal Analysis Report

> **Analysis Type**: Gap Analysis (Design W0~W7 대비 실행 검증)
>
> **Project**: goodman-gls
> **Version**: 0.1.0
> **Analyst**: jhlim725
> **Date**: 2026-07-12
> **Design Doc**: [goodman-gls-masking-removal.design.md](../02-design/features/goodman-gls-masking-removal.design.md)

---

## 1. Analysis Overview

### 1.1 Analysis Purpose

Design의 게이트 W0~W7·변경 파일 명세(§3)·테스트 플랜(§8) 대비 실제 실행/산출물을 검증하고 Match Rate를 산정한다.

### 1.2 Analysis Scope

- **Design Document**: `docs/02-design/features/goodman-gls-masking-removal.design.md`
- **Implementation**: 커밋 `a3067ae` (main, pushed) + Vercel 배포 2건 (preview `goodman-krbs06o4m`, prod `goodman-qq9okb3an`)
- **판정 방식**: repo 전례(직접 분석, 6회 확립 패턴) — 이번 사이클은 repo/Vercel 상태로 대부분 재검증 가능

---

## 2. Gap Analysis (Design vs 실행)

### 2.1 게이트 실행 충실도

| Gate | Design 기대 | 실제 | Status |
|------|-------------|------|--------|
| W0 사전점검 | drift·PR·미커밋 스냅샷·teams | 실행 — **drift 14커밋 발견** → 설계된 경로(겹침 검사 후 ff-pull 5fff769)로 처리, PR #3(무관) 확인, teams 재확인 | ✅ |
| W1 worktree | detached HEAD, scratchpad 경로 | 동일 (5fff769 기준) | ✅ |
| W2 링크 | `vercel link --yes` goodman-ksways/goodman-gls | 성공 | ✅ |
| W3 preview | `vercel deploy` (비-prod) | `goodman-krbs06o4m` 제출 | ✅ |
| W4 판정 | Ready + 마스킹 없는 build 로그 | **Ready** + `Running "next build"` + ✓ 10/10 prerender + Build Completed | ✅ PASS |
| W5 커밋 | 3파일만 stage, 승인 후, 단일 커밋, push 전 drift 재점검 | 승인(AskUserQuestion) → `a3067ae` 3 files 10+/10-, push 전 fetch drift 0 | ✅ |
| W6 prod | 승인 후, fresh worktree(새 HEAD), `vercel --prod` | 승인 → worktree 재생성(a3067ae, buildCommand 확인) → `goodman-qq9okb3an` Ready | ✅ |
| W7 검증 | prod Ready + 4라우트 200 | Ready + `/` `/company` `/services` `/network` 전부 200, prod 로그도 마스킹 없는 build 10/10 | ✅ |
| 정리 | worktree 제거 | 완료 | ✅ |

### 2.2 변경 파일 명세 (Design §3) 대비

| 항목 | Design | 실제 (a3067ae) | Status |
|------|--------|----------------|--------|
| vercel.json | `"next build \|\| true"` → `"next build"` | 동일 (현재 repo 확인) | ✅ |
| CLAUDE.md D1 | 스코프명 2곳 | 2곳 정정 (Deploy Configuration + 주의 문단) | ✅ |
| CLAUDE.md D2 | 배포 방식 정정 | "CLI 수동 배포 + git 연동 미복구 debt" 반영 | ✅ |
| CLAUDE.md D3 | Build note + Key Files vercel.json 행 | 반영 + **scope+**: `global-error.tsx` 행도 정정 (마스킹 언급 잔존분 — 정합성) | ✅+ |
| .commit_message.txt | 한 줄 갱신 | 반영 | ✅ |
| 불변 목록 (AGENTS.md 등) | 미접촉 | `git status` 사이클 전후 동일 (M 3파일 유지) | ✅ |

### 2.3 테스트 플랜 (Design §8) 대비

| Test | 기대 | 실제 | Status |
|------|------|------|--------|
| W4 preview | Ready + 완주 로그 | PASS (§2.1) | ✅ |
| 회귀(로컬) | lint 0 · tsc 0 · vitest **17/17** | lint 0 · tsc 0 · vitest **38/38** | ✅ (⚠️ 기대치 stale — §2.4) |
| 격리 | 미커밋 3파일 diff 0 | 유지 | ✅ |
| W7 prod | Ready + 4라우트 200 | PASS | ✅ |
| rollback 경로 | 직전 Ready prod 존재 | 7건 확인(Plan 단계) + 신규 1건 | ✅ |

### 2.4 발견된 Gap

| # | Gap | 심각도 | 처리 |
|---|-----|--------|------|
| G1 | Design §8 테스트 기대치 "17/17"이 stale — W0에서 유입된 upstream 14커밋이 테스트를 38개로 증가시킴. 실행은 "전부 통과" 취지 충족 | 🟢 Low | 본 문서로 기록. Design 문서 수치는 작성 시점 스냅샷임을 전례에 추가 |
| G2 | W5·W6 승인을 1회 AskUserQuestion으로 일괄 수집 (Design은 순차 2지점) | 🟢 Low | 사용자가 양쪽 명시 승인 — 의도(각 액션 사전 동의) 충족. 효율적 일탈 |
| G3 | W0 drift가 예상(리스크 Low)보다 컸음(14커밋) — 단 설계된 결정트리로 무손실 처리 | 🟢 Low | 결과적으로 prod에 최신 main 반영이라는 부수 이득 |

### 2.5 Match Rate Summary

```
┌─────────────────────────────────────────────────────┐
│  Overall Match Rate: 98%                             │
├─────────────────────────────────────────────────────┤
│  ✅ 게이트 9/9 · 파일 명세 6/6 · 테스트 5/5           │
│  ⚠️ Gap 3건 — 전부 Low (stale 수치·승인 배칭·drift)   │
│  ❌ 미이행/위반: 0                                    │
│  감점: -2pp (G1 Design 수치 정확성, 전례 스타일 준용)  │
└─────────────────────────────────────────────────────┘
```

---

## 3. Code Quality Analysis

N/A — 소스 코드 변경 0줄 (설정 1줄 + 문서). 로컬 게이트: lint 0 err · tsc 0 err · vitest 38/38.

---

## 4. 부수 성과 (설계 목표 외)

| 항목 | 내용 |
|------|------|
| prod 콘텐츠 갱신 | 15일간 배포 안 되던 upstream 14커밋(영어 기본 라우트·SSR lang·hero 개선 등)이 함께 반영 |
| 진단 데이터 | 동일 커밋 5fff769/a3067ae가 macOS 로컬 빌드 실패·Vercel linux 통과 — 플랫폼 차이 가설 보강 (ksways-web node24-build-fix 후속) |
| 문서 신뢰 회복 | CLAUDE.md 배포 섹션이 실제 운영(스코프·CLI 배포)과 일치하게 됨 |

---

## 5. Recommended Actions

### 5.1 이 사이클 마감

| Priority | Item |
|----------|------|
| 🟢 1 | `/pdca report goodman-gls-masking-removal` |
| 🟢 2 | PDCA 문서 커밋 + archive |

### 5.2 후속 후보 (기존 + 유지)

| 후보 | 근거 |
|------|------|
| vercel-git-integration-restore | git push 자동배포 미복구 (8 repo 공통 debt) — 이번에 CLI 배포로 우회했으나 근본 해결 아님 |
| linux-build-verification | Docker로 darwin/linux 확정 (ksways-web 사이클서 이관) |
| AGENTS.md 미러 동기화 | 사용자 미커밋 작업 완료 후 CLAUDE.md 변경분 반영 |

---

## 6. Design Document Updates Needed

- G1: 없음 (수치 stale은 이 문서로 기록 — Design 원문은 작성 시점 기준 정확)

---

## 7. Next Steps

- [x] Gap 분석 (본 문서)
- [ ] `/pdca report goodman-gls-masking-removal`
- [ ] archive

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-07-12 | Initial analysis — Match 98%, Gap 3건 전부 Low, iterate 불요 | jhlim725 |
