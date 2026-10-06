# Copilot Instructions for SperX Merchant App

## Mission

This repository is a merchant operations dashboard for SperX. The codebase is opinionated around shop-scoped flows, loyalty programs, and QR/member scanning. Follow the existing app structure and conventions instead of inventing a new architecture.

## Core stack

- Next.js 16 with App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- Clerk auth via `@clerk/nextjs`
- Axios shared client in `src/lib/api/client.ts`
- App data and domain models in `src/lib/types.ts` and `src/types/`

## Repository conventions

- Keep feature code close to the route in `src/app/...`.
- Use route groups like `(splash)` when a flow is not a normal application page.
- Keep page files thin; move complex logic into focused components or helper modules.
- Client components must include `'use client';` at the top.
- Prefer `next/navigation` APIs (`router.push`, `router.replace`, `useParams`) rather than ad hoc navigation logic.
- Use the `@/*` alias for imports; do not introduce alternative alias patterns.

## Authentication and merchant flow rules

- Clerk is the source of auth and merchant identity.
- Use `useUser()` for client-side auth checks.
- For server-side or API access, prefer `auth()` and `getToken()` from `@clerk/nextjs/server` or `@clerk/nextjs`.
- Landing and redirect flows must gracefully handle empty or missing merchant/shop metadata.
- Missing shop configuration is a setup flow, not a crash condition.
- Preserve the redirect behavior used by the app: signed-in merchants without a shop should go to `/setup`, and those with a shop should go to the first shop scanner route.

## API layering

- All network calls should pass through the shared Axios client in `src/lib/api/client.ts`.
- Put request logic by domain in `src/lib/api/*.ts` (`shop.ts`, `member.ts`, `loyalty.ts`).
- Name functions in a clear task-oriented style: `getShop`, `setupShop`, `getMembers`, `createLoyaltyProgram`, etc.
- Normalize backend data before returning it to UI code, especially when values are strings that become `Date` or `number`.
- Prefer strongly typed request and response contracts.

## Type and data model guidelines

- Put core app models in `src/lib/types.ts`.
- Keep domain DTOs and request/response shapes in `src/types/` when they are feature-specific.
- Prefer explicit types over `any`.
- Keep dynamic values narrow and predictable rather than widening them into loose unions.
- Treat dates as `Date` objects in app code; convert on API boundaries.

## UI and styling

- Use Tailwind utility classes for layout and styling.
- Reuse components in `src/components/...` before inlining new UI.
- Keep components composable and data-driven.
- Respect the existing theme system: `ThemeContext` and shop config-driven theming are part of the app design.
- When editing shop-scoped pages, keep the merchant context and shop styling intact.

## Shop-scoped state and context

- Shop and loyalty-program state are intentionally scoped to the route and bought into via context.
- Prefer context for data shared across nested screens, especially inside `src/app/shop/[id]/`.
- Do not introduce a global state layer when the app already has route-local or context-based patterns.
- If a route loads shop or loyalty data, handle loading and failure gracefully instead of crashing the page.

## Scanner and member workflows

- Scanner flows live under `src/app/shop/[id]/scanner/...`.
- Keep scanning, member lookup, reward redemption, and reward display states separate and explicit.
- The QR scanner is client-only and uses `@yudiel/react-qr-scanner`.
- Do not remove the user-facing mocked-scan fallback behavior in dev flows without a clear replacement.
- Preserve the merchant-facing experience: scan, resolve member, display point state, and allow redemption workflows that fit the existing app design.

## Code quality bar

Before considering work complete:
1. Match the repo’s existing architecture and naming rather than introducing a new pattern.
2. Keep edits narrow and relevant; avoid broad refactors without clear need.
3. Run the relevant validation command: `npm run lint`.
4. If the repo has no tests, prefer targeted lint/build validation over assumptions.
5. If routes, auth, or API contracts change, verify the UI and backend response expectations together.

## AI operating rules

- Prefer existing patterns over new abstractions.
- If a file already has a domain-specific helper, reuse it instead of creating a parallel implementation.
- Preserve behavior that users rely on, especially redirect flows, setup screens, theme styles, and QR scan fallback actions.
- Do not remove developer-facing or testability affordances unless there is a deliberate product change.
- When in doubt, follow the existing route boundaries and conventions already used in this repo rather than default Next.js patterns from memory.

## Default assumptions

- This is a merchant operations app, not a generic marketing site.
- Navigation and data permissions are often shop-scoped.
- The app should be resilient to incomplete merchant/shop configuration.
- The source of truth is the repository’s current implementation, not the default Create Next App README or generic Next.js assumptions.
