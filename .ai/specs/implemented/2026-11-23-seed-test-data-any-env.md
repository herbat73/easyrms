# Seed test data in any environment when the database is empty

Extends: .ai/specs/implemented/2026-11-23-preload-test-data-flag.md

## 📝 TLDR
`npm run seed:dev` refuses to run when `NODE_ENV=production` (`DevSeedRefusedError`), so a test or demo deployment cannot get its two suppliers and the dev admin. This spec proposes (future behavior) that the command works in every environment, and that in production it runs only when no agent and no supplier exist yet, so it can never touch a database that holds real data. Source: issue #186.

## 📝 Problem Statement
The seeder (`packages/app/src/server/dev-seed.ts`, `packages/app/scripts/seed-dev.ts`) throws when `NODE_ENV` is `production` because the seeded admin (`admin@example.com`) has a public password. Since #178, #183 and #184 a production-mode deployment can run the fake order source and the data reset (`EASYRMS_ALLOW_FAKE_ORDERS_IN_PRODUCTION`, `EASYRMS_RESET_TEST_DATA`), but a fresh one has no way to create the first test data except `agent:create`. The owner wants the seed command usable anywhere, on an empty database.

## 📝 Proposed Solution
- Remove the unconditional `NODE_ENV === "production"` refusal from both the script and `seedDevData`.
- Replace it with an **emptiness guard that applies only when `NODE_ENV=production`**: the seed proceeds only if `agentRepository.list()` is empty and `supplierService.list()` is empty. Otherwise it throws a new `SeedDataPresentError` ("The database already holds agents or suppliers; refusing to seed a production environment that has data") and writes nothing.
- Outside production the behavior is unchanged: idempotent, non-destructive rerun (existing suppliers and `active`/`disabled` admin are left as they are).
- Running the command is the explicit opt-in; no extra flag.
- Alternatives rejected: a flag such as `EASYRMS_ALLOW_SEED_IN_PRODUCTION` (the issue says "when the seed command is executed"; the emptiness guard is what protects data); applying the emptiness guard everywhere (would break the documented idempotent rerun and the post-reset reseed on dev databases that already hold the seed).

## 📝 Delta
### Capability: dev-seed
#### MODIFIED Requirement: Seed refuses in production
The system SHALL run the seed in every environment; when `NODE_ENV` is `production` it SHALL run only if no agent and no supplier exist.
Frozen by: `dev-seed.test.ts` "refuses to run in production" (current test; replaced by the scenarios below).
##### Scenario: Empty production database
- WHEN `npm run seed:dev` runs with `NODE_ENV=production` and the database has no agents and no suppliers
- THEN the two suppliers and the dev admin are created and the exit code is 0
##### Scenario: Production database with data
- WHEN the same command runs and at least one agent or supplier exists
- THEN it exits 1 with `SeedDataPresentError`, and nothing is written
##### Scenario: Development rerun
- WHEN it runs with `NODE_ENV=development` on a database that already holds the seed
- THEN it behaves as before (existing rows kept)

## 📝 Architecture
- `app` only: `src/server/dev-seed.ts` (guard + new error, `DevSeedDeps` gains `agentRepository.list`), `scripts/seed-dev.ts` (drops its early production throw; the guard in `seedDevData` runs after the database connection is open, which is acceptable because the read is the check), `dev-reset.ts` keeps passing `nodeEnv: "development"` (its own truncate-first flow is unchanged). `core`, `db`, API routes, DI: unchanged. The name `DevSeedRefusedError` is kept for the guard error's base to avoid churn; `SeedDataPresentError` is a new class in the same file.
- `npm run setup` still seeds only the default local database.

## 📝 Edge Cases & Failure Scenarios
- Concurrent seeds on an empty production database: both pass the check; the second `invite` fails on the unique e-mail and the script exits 1 with the existing error message. Accepted (operator action, single run).
- Production database with returns but no agents or suppliers: seeding proceeds; returns are not touched.
- A previous seed interrupted after creating suppliers: in production the rerun is refused (data present); the operator uses `EASYRMS_RESET_TEST_DATA` reset or clears the database.
- Production seeding publishes a known password: documented in `Configuration.md` and in the script output.

## 📝 Risks & Impact Review
Medium security impact: a production-mode deployment can end up with an admin whose password is public. Mitigations: the emptiness guard (never on a populated database), the explicit command, and a warning line printed when `NODE_ENV=production`. Operators must change the password or remove the agent (`agent:create` flow) before real use. No schema or API change; rollback is reverting the change.

## Resolved assumptions (autonomous defaults)
| # | Question | Chosen answer | Why |
|---|---|---|---|
| Q1 | What is "no data already loaded"? | No agents and no suppliers (the tables the seed writes) | Smallest definition that protects the seed's own targets; returns need agents/suppliers anyway. |
| Q2 | Does the guard apply outside production? | No, only in production | Keeps the documented idempotent rerun and dev reset. |
| Q3 | Extra opt-in flag for production? | No; running the command is the opt-in | The issue asks for exactly this; the guard protects data. |
| Q4 | Seeding a public-password admin in production | Allowed on an empty database, with a printed warning ⚠ NEEDS HUMAN CONFIRMATION | Weakens a security default the original author set deliberately; the owner must confirm. |

## 📋 Phasing
Single phase.

## 📋 Implementation Plan
Phase 1 (each step leaves the app working):
1. **app** `dev-seed.ts`: add `SeedDataPresentError`, the production emptiness guard and `agentRepository.list` in `DevSeedDeps`; update `dev-seed.test.ts` (production + empty → seeds; production + agent or supplier → throws, nothing written; development rerun unchanged).
2. **app** `scripts/seed-dev.ts`: remove the early production throw, pass `agentRepository`, print a warning when `NODE_ENV=production`; update the header comment.
3. **docs** `Configuration.md` (`EASYRMS_DATABASE_URL` row), `GettingStarted.md` (dev seed paragraph), `README.md` if it states the refusal, `dev-seed.ts` header comment: the new rule.
4. Gate: `lint`, `typecheck`, `test`, `audit`, `docs:check`, `storybook:build`.
