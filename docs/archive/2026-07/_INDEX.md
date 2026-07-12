# PDCA Archive Index — 2026-07

| Feature | 기간 | 결과 | Match Rate | 문서 |
|---------|------|------|-----------|------|
| [goodman-gls-masking-removal](goodman-gls-masking-removal/) | 2026-07-12 (당일) | **SUCCESS** — `vercel.json` `\|\| true` 마스킹 제거(`a3067ae`), Vercel preview 검증(마스킹 없이 10/10 prerender) 후 prod 배포 Ready·4라우트 200 (upstream 14커밋 동반 반영). CLAUDE.md 배포 문서 정정(스코프 goodman-ksways·CLI 수동·build note). 로컬 macOS 빌드만 framework debt 잔존(Next 16.3 대기). 후속: vercel-git-integration-restore(High)·linux-build-verification(Medium) | 98% | [plan](goodman-gls-masking-removal/goodman-gls-masking-removal.plan.md) · [design](goodman-gls-masking-removal/goodman-gls-masking-removal.design.md) · [analysis](goodman-gls-masking-removal/goodman-gls-masking-removal.analysis.md) · [report](goodman-gls-masking-removal/goodman-gls-masking-removal.report.md) |

**계보**: [2026-05 goodman-gls-prerender-debt](../2026-05/goodman-gls-prerender-debt/) (마스킹 도입) → ksways-web `docs/archive/2026-07/node24-build-fix/` (Node 가설 반증·본 사이클 후보 도출) → 본 사이클 (마스킹 제거)
