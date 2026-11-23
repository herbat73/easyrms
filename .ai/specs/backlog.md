# Backlogs

## .ai/specs/product-brief.md
Backlog source: .ai/specs/product-brief.md
Last filed: 2026-10-26 (E00 closed on the tracker 2026-11-08; recorded here 2026-11-10; E06–E08 recorded 2026-11-23 from the shipped specs, no issues)

Research variant filed 2026-10-22. On 2026-10-24 E03 and E04 were filed. E01 (customer side, shipped in PR #27) and E02 (agent decision, shipped in PR #23) are recorded here only, with no issues, by owner choice; ids E01 and E02 stay reserved (stories E01-S01..S03, E02-S01). On 2026-10-25 E03 was closed (shipped, PR #33), E04 body refreshed, and E05 (complaints slice, PR #36) recorded without issues. On 2026-10-26 E00-T04..T06 (#47–#49) were filed under E00 after the sample was replaced by the 50-case set (A01 cost, Q20 thresholds, Q21 sample records).

| Id | Issue | Title | Epic | Depends on | Adopted |
|---|---|---|---|---|---|
| E00 | [#13](https://github.com/herbat73/ai_leaders_nextjs/issues/13) | Discovery — closed 2026-11-08 (completed) | — | — | no |
| E00-T01 | [#14](https://github.com/herbat73/ai_leaders_nextjs/issues/14) | Sample ~50 recent return and complaint cases (A01, A04, Q02) — closed 2026-10-26 (completed) | #13 | — | no |
| E00-T02 | [#15](https://github.com/herbat73/ai_leaders_nextjs/issues/15) | Collect the KPI baselines (A02, A03, A07) — closed 2026-11-08 (completed; desk research only, no baselines for WISMR, vouchers, mobile) | #13 | — | no |
| E00-T03 | [#16](https://github.com/herbat73/ai_leaders_nextjs/issues/16) | Interview 2–3 key suppliers about complaint format and channel (A05) — closed 2026-11-08 (completed; desk research only, no supplier interviews) | #13 | — | no |
| E00-T04 | [#47](https://github.com/herbat73/ai_leaders_nextjs/issues/47) | Measure the cost of follow-up questions (A01) — closed 2026-11-08 (completed) | #13 | — | no |
| E00-T05 | [#48](https://github.com/herbat73/ai_leaders_nextjs/issues/48) | Judge sample representativeness and whether a second sample is needed (A04, Q21) — closed 2026-11-08 (not planned) | #13 | — | no |
| E00-T06 | [#49](https://github.com/herbat73/ai_leaders_nextjs/issues/49) | Document the sample records (Q21) — closed 2026-11-08 (completed) | #13 | — | no |
| E03 | [#29](https://github.com/herbat73/ai_leaders_nextjs/issues/29) | Agent access to the panel (Q15) — closed 2026-10-25 | — | — | no |
| E03-T01 | [#30](https://github.com/herbat73/ai_leaders_nextjs/issues/30) | Write the spec for agent login and roles | #29 | — | no |
| E04 | [#31](https://github.com/herbat73/ai_leaders_nextjs/issues/31) | Later (parked) — closed 2026-11-10 (stories #108–#110 shipped; remaining items unfiled per D15) | — | — | no |
| E04-S01 | [#108](https://github.com/herbat73/ai_leaders_nextjs/issues/108) | Rules recommendations on the decision card + comparison events (R08–R10) | #31 | — | no |
| E04-S02 | [#109](https://github.com/herbat73/ai_leaders_nextjs/issues/109) | Inbox signals for rules (R10c) | #31 | #108 | no |
| E04-S03 | [#110](https://github.com/herbat73/ai_leaders_nextjs/issues/110) | Read-only rules page and simulation (optional) | #31 | — | no |
| E05 | — | Complaints and vendor claims (shipped, PR #36, #37; recorded only, no issue, by owner choice) | — | — | no |
| E06 | — | Lists with paging, filters and search: customer returns (PR #73, issue #75), inbox query pushdown (PR #98), suppliers (#123, PR #126), supplier claims (#124, PR #127) (shipped; recorded only, no epic issue) | — | — | no |
| E07 | — | Transport damage, missing items and photo evidence (D21): Phase 1 #139, Phase 2 #142, Phase 3 #143, audit events #146, retention and erasure #148 (shipped; recorded only, no epic issue) | — | — | no |
| E08 | — | Dev and test-environment tooling: dev seed (#157), admin login link (#159), dev DB reset (#174, PR #176), fake orders in production (#178), `EASYRMS_PRELOAD_TEST_DATA` (#179, PR #181), `EASYRMS_RESET_TEST_DATA` (#183, PR #184), seed in any environment (#186, PR #188) (shipped; recorded only, no epic issue) | — | — | no |
