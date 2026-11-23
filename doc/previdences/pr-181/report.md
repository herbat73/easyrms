# QA evidence: PR #181 (`EASYRMS_PRELOAD_TEST_DATA`)

Head tested: 90c0b4eb40932a2bb11501da33e917ae497048f7. Provider: agent-browser v0.38.2. Page: `/` (lookup), built from the PR head in an isolated worktree, `EASYRMS_ORDER_SOURCE=fake`.

| # | Mode | `EASYRMS_PRELOAD_TEST_DATA` | Expected | Observed | Result | Screenshot |
|---|---|---|---|---|---|---|
| 1 | `next start`, `NODE_ENV=production` | `true` | "Dane testowe" panel with 5 sample orders, heading without "tylko środowisko deweloperskie" | panel shown, 5 rows PL-10001..PL-10005 | PASS | 01-prod-flag-on.png |
| 2 | production | unset | no panel | no panel | PASS | 02-prod-flag-unset.png |
| 3 | `next dev` | `true` | panel shown | panel shown, 5 rows | PASS | 03-dev-flag-on.png |
| 4 | `next dev` | unset | no panel (development no longer shows it by default) | no panel | PASS | 04-dev-flag-unset.png |

Verdict: PASS (4/4).

Not exercised: the lookup flow with a sample order (the change does not touch it; it needs the QA database), the mobile viewport, and a production run with the fake source not allowed to serve orders. The test environment script was not used, because it boots the main checkout and needs the QA database; the app was served directly from the PR head instead. Sample data only, no credentials in the screenshots.
