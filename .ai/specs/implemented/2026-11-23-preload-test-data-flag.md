# Test-data panel behind EASYRMS_PRELOAD_TEST_DATA

## 📝 TLDR
The customer lookup page (`/`) shows a "Dane testowe" panel with the sample customers and orders of the fake order source, but only when `NODE_ENV` is not `production`. This spec proposes (future behavior) one environment flag, `EASYRMS_PRELOAD_TEST_DATA=true`, as the only switch for that panel in every environment, replacing the `NODE_ENV` rule. Unset means hidden, in development too. Source: issue #179 (the title says `EASYRMS_SHOW_TEST_USERS`; the body, which this spec follows, says `EASYRMS_PRELOAD_TEST_DATA`).

## 📝 Problem Statement
`DevSamples` (`packages/app/src/app/_lookup/dev-samples.tsx`) hides itself when `NODE_ENV === "production"`. Since #178 production can run the fake order source (`EASYRMS_ALLOW_FAKE_ORDERS_IN_PRODUCTION=true`), but testers on such an environment still cannot see which order number and e-mail to type, because the panel is welded to the environment name (Configuration.md says so explicitly). The owner wants the panel controlled by configuration, not by `NODE_ENV`.

## 📝 Proposed Solution
- New variable `EASYRMS_PRELOAD_TEST_DATA`: exactly `true` turns the panel on; unset, blank or anything else keeps it off.
- The `NODE_ENV` check is removed from `DevSamples`. The panel is shown when the flag is on **and** the fake order source is the active one, because the listed orders exist only there; with another source the flag has no visible effect.
- Alternatives rejected: reusing `EASYRMS_ALLOW_FAKE_ORDERS_IN_PRODUCTION` (a different concern: it relaxes a safety check, it does not choose what the UI shows); also unlocking the admin login link and the dev reset button (see assumptions).

## 📝 Architecture
- `core`: unchanged (`selectOrderSource` stays as is); the display decision lives in `app`.
- `app`: `_lookup/dev-samples.tsx` replaces `fakeSourceActive()` (which returns false in production) with a helper in a new `_lookup/test-data-visibility.ts` (same shape as `admin-login-visibility.ts`): `showTestData({ flag, orderSource })` → `flag === "true" && orderSource === "fake"`. The component resolves the source with `selectOrderSource({ nodeEnv, source, allowFakeInProduction: true })` inside try/catch (an invalid source hides the panel; the real request path still reports the configuration error). `allowFakeInProduction: true` is passed only for this display decision; it never changes which source serves orders (`container.ts` keeps its own check).
- Unchanged: `db`, API routes, DI, the admin login link, the dev reset button, `EASYRMS_ORDER_SOURCE` rules.

## 📝 UI/UX
Panel markup stays. The heading "Dane testowe (tylko środowisko deweloperskie)" becomes "Dane testowe" because the panel can now appear anywhere the flag is set. Polish copy moves to `_lookup/copy.ts` only if the file already holds the other strings of this page (it does for the title and intro).

## 📝 Edge Cases & Failure Scenarios
- Flag `true`, source `fake` in production without `EASYRMS_ALLOW_FAKE_ORDERS_IN_PRODUCTION`: orders already fail closed (opaque 500 on lookup); the panel would still render. Accepted: it is the operator's explicit flag, and the failure is the lookup's own configuration error. (Alternative: also require the allow flag in production; rejected as a second coupling.)
- Flag `true`, `EASYRMS_ORDER_SOURCE` unset in development: default source is `fake`, panel shown. In production an unset source throws, panel hidden.
- Flag `TRUE`, `1`, `yes`: off (strict `true`, like `EASYRMS_ALLOW_FAKE_ORDERS_IN_PRODUCTION`).
- Behavior change: a developer who relied on the panel appearing by default sees nothing until the flag is set. `npm run setup` and GettingStarted.md must say how to set it.

## 📝 Risks & Impact Review
Low. No schema or API change. The one exposure: with the flag on in production the page lists sample e-mails and order numbers of the fake source. They are public sample data (not credentials, no password), but the flag must stay off on a real-data environment; Configuration.md says so. Rollback: unset the variable.

## Resolved assumptions (autonomous defaults)
| # | Question | Chosen answer | Why |
|---|---|---|---|
| Q1 | "Test users" = which UI? | The "Dane testowe" sample-orders panel on `/` | It is the only place listing test users/orders; smallest scope |
| Q2 | Should the flag also control the admin login shortcut and dev reset button? | No, they keep their current `NODE_ENV` rules (later changed for the reset button by issue #183: `EASYRMS_RESET_TEST_DATA`) | The reset button is destructive and also guarded by a local-DB check; widening it is out of the ask |
| Q3 | Default in development? | Off; the dev panel needs the flag too | The issue says to remove the current rule; `.env` documents the flag |
| Q4 | Which name? | `EASYRMS_PRELOAD_TEST_DATA` (issue body) | Title and body disagree; body is explicit twice. ⚠ NEEDS HUMAN CONFIRMATION |
| Q5 | Flag on but source not `fake`? | Panel hidden | Listed orders would not exist |

## 📋 Phasing
Single phase; the flag, the visibility rule and the docs ship together.

## 📋 Implementation Plan
Phase 1 (each step leaves the app working):
1. **app** `_lookup/test-data-visibility.ts` with `showTestData` and `test-data-visibility.test.ts`: flag `true` + `fake` → true; flag unset/`false`/`TRUE`/blank → false; source other than `fake` → false.
2. **app** `dev-samples.tsx` uses it (read `process.env.EASYRMS_PRELOAD_TEST_DATA`, `EASYRMS_ORDER_SOURCE`), drops the `NODE_ENV` check, heading text "Dane testowe".
3. **docs** `Configuration.md`: new row (default unset, strict `true`, exposes sample data, needs the fake source); fix the `EASYRMS_ALLOW_FAKE_ORDERS_IN_PRODUCTION` row (it no longer says the panel stays off); `GettingStarted.md` and `.env.example` (which mentions the panel): set `EASYRMS_PRELOAD_TEST_DATA=true` for local development. Grep `.ai/qa` scenarios for "Dane testowe" and set the flag in the test-env script if any depends on the panel.
4. Run the gate: `lint`, `typecheck`, `test`, `audit`, `docs:check`, `storybook:build`.
