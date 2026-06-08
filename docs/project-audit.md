# Project Audit — React/Vite School Management System

## Baseline findings

- The production build and ESLint checks pass, but a dedicated TypeScript check was missing from `package.json`.
- `npx tsc --noEmit` initially failed because several TSX pages relied on weak inference for object maps, form errors, textarea attributes, date formatting options, and icon props.
- Authentication used a demo fallback when `VITE_API_BASE_URL` was absent, but any user ID/password could sign in as the selected role.
- Authenticated users could still visit `/login` and `/forgot-password` instead of being redirected to their role dashboard.
- Several large feature pages mix mock data, form logic, rendering, and page layout in one file. Future revamp work should extract reusable hooks, typed fixtures, and shared form components module by module.

## Fixes applied in this pass

- Added explicit TypeScript models to high-risk attendance, homework, and diary flows so `npx tsc --noEmit` now passes.
- Replaced invalid DOM/lucide prop usage with typed alternatives.
- Added role-specific demo credential validation and visible demo credentials on the login screen.
- Redirected authenticated users away from public auth screens.

## Recommended next sections

1. Extract mock data into typed fixture/service files.
2. Normalize API filenames and endpoints (`attendence`, `calender`) to avoid long-term naming drift.
3. Add `typecheck` to `package.json` and run it in CI alongside lint/build.
4. Refactor dashboard/table/form pages into smaller components.
5. Add route-level error boundaries and empty/error states for API pages.
6. Improve accessibility for clickable `<div>` navigation items and social links.
