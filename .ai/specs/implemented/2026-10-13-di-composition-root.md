# DI composition root (Awilix)

- **Date:** 2026-10-13
- **Status:** Implemented in the same change
- **Part of:** `2026-10-13-monorepo-migration.md`, phase 3

## Goal

Services are resolved from an Awilix container; `app` is the only package that wires packages together.

## Design

- `@easyrms/core` declares ports (`ReturnRepository`) and services (`ReturnService`) and exports `registerCore(container)`. Services take their dependencies as a constructor object (Awilix `PROXY` injection mode) and import no global container.
- `@easyrms/db` exports `registerDb(container)`: singleton `orm`, scoped `em` (a fork per scope), scoped `returnRepository`.
- `packages/app/src/server/container.ts` builds the root container once (cached on `globalThis`) and exposes `createRequestScope()`; route handlers and Server Components create one scope per request (the project uses no Server Actions) and resolve services from it.
- API: `GET /api/health` (checks the DB), `GET/POST /api/returns`, `PATCH /api/returns/[id]` (status change).

## Out of scope

Auth, background jobs, email.
