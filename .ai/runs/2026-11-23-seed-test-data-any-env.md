# Execution plan: seed test data in any environment (issue #186)

Source doc: .ai/specs/2026-11-23-seed-test-data-any-env.md
Spec PR: #187

## Goal
`npm run seed:dev` works in every environment; in production it runs only when no agent and no supplier exist.

## Scope / Non-goals
`app` (`dev-seed.ts`, `scripts/seed-dev.ts`) and docs. No schema/API change; dev reset and `npm run setup` unchanged.

## Risks
Public-password admin can be seeded into production (spec Q4, needs human confirmation; PR stays draft).

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Seed in any environment

- [ ] 1.1 dev-seed.ts guard, SeedDataPresentError and tests
- [ ] 1.2 seed-dev.ts script: drop early production throw, warn in production
- [ ] 1.3 Docs: Configuration.md, GettingStarted.md, README, header comments
- [ ] 1.4 Full validation gate
