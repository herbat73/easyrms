# Execution plan: preload-test-data

Source doc: .ai/specs/2026-11-23-preload-test-data-flag.md (spec PR #180; the spec file is not committed on this branch)
Issue: #179

## Goal
`EASYRMS_PRELOAD_TEST_DATA=true` alone decides whether the "Dane testowe" panel shows on `/`; the `NODE_ENV` rule is removed.

## Scope
`app` (`_lookup/dev-samples.tsx`, new `_lookup/test-data-visibility.ts` + test), `Configuration.md`, `GettingStarted.md`, `.env.example`, QA scripts that rely on the panel.
Non-goals: admin login link, dev reset button, `core`, schema, API.

## Risks
Flag on in production lists public sample data; documented. Developers lose the default-on panel until they set the flag.

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles.

### Phase 1: Flag, panel and docs

- [ ] 1.1 app: showTestData helper and tests
- [ ] 1.2 app: DevSamples uses the flag
- [ ] 1.3 docs: Configuration, GettingStarted, .env.example, QA scripts
