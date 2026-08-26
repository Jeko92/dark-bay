# Contributing to DarkBay

Classmates and collaborators: this project follows a simple branch model and
commit convention. Please stick to both so PR history and reviews stay easy
to follow.

## Branch model

```
main        (protected, always deployable)
 └─ develop (protected, integration branch)
     └─ feature/<scope>-<slug>   (one branch per feature/guide step)
```

- Branch all new work off `develop`, never off `main` directly.
- Name feature branches `feature/<scope>-<slug>`, e.g. `feature/auctions-crud`.
- Open pull requests **into `develop`**, not `main`. `main` only receives
  merges from `develop` when a stable, demo-able state is promoted.
- Squash-merge feature branches so each merged PR is a single clean commit.

## Commit messages

This repo uses [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short imperative summary>
```

Valid `type`s and `scope`s are defined in [`.conventionalcommit.json`](./.conventionalcommit.json)
at the repo root — that file drives IDE autocomplete (e.g. WebStorm's
Conventional Commit plugin) and is the source of truth. There's no local
commit hook enforcing this, so it's on you and your reviewers to keep it
consistent.

Example:

```
feat(auctions): add auction module
```

## Pull requests

- PR title must be a valid Conventional Commit line (this is lint-checked by
  CI) — it doubles as the squash-merge commit message.
- Target `develop`, unless you're doing a `develop → main` promotion.
- At least one approving review is required before merging.

## Status

🚧 This project is a work in progress, being built incrementally per the
guide's numbered steps.
