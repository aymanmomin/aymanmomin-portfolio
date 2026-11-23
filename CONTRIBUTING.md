# Contributing

## Branches
`main` (releases) <- `develop` (integration) <- `feature/*`, `fix/*`, `docs/*`, `refactor/*`, `chore/*`.
Never commit directly to `main` or `develop`. Branch names must not contain spaces.

## Commits
Conventional Commits: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.
Example: `feat(hero): add interactive 3D landing scene`. Keep commits small and focused.

## Pull requests
1. Branch from `develop`, make one focused change
2. Run lint, tests and build
3. Push and open a PR into `develop` using the template
4. Merge only when checks pass
5. Releases go from `develop` to `main` in a separate PR

Never commit secrets, `.env` files or personal financial data.