# Execution plan: preload-test-data

Source doc: .ai/specs/implemented/2026-11-23-preload-test-data-flag.md (spec PR #180)
Issue: #179

## Goal
`EASYRMS_PRELOAD_TEST_DATA=true` alone decides whether the "Dane testowe" panel shows on `/`; the `NODE_ENV` rule is removed.

## Scope
`app` (`_lookup/dev-samples.tsx`, new `_lookup/test-data-visibility.ts` + test), `Configuration.md`, `GettingStarted.md`, `.env.example`, QA scripts that rely on the panel.
Non-goals: admin login link, dev reset button, `core`, schema, API.

## Risks
Flag on in production lists public sample data; documented. Developers lose the default-on panel until they set the flag.

## Progress

> Convention: `- [x]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Flag, panel and docs

- [x] 1.1 app: showTestData helper and tests
- [x] 1.2 app: DevSamples uses the flag
- [x] 1.3 docs: Configuration, GettingStarted, .env.example, QA scripts
