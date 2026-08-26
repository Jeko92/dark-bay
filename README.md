# DarkBay

An underground marketplace API where users list items for auction and bid
against each other. Sellers post an auction with a starting price and an end
date (defaults to +3 days if omitted); other users compete by placing offers.
A bid is only valid if it meets the starting price and strictly beats the
current highest offer, and only while the auction is still open. No
frontend — this is a pure JSON REST API, built with NestJS.

## Tech Stack

- **Framework:** NestJS (CommonJS, strict TypeScript)
- **Database:** SQLite via `better-sqlite3` + TypeORM
- **Auth:** Passport + `@nestjs/jwt`, global guard with `@Public()` opt-out
- **Docs:** `@nestjs/swagger` (OpenAPI, CLI plugin enabled)
- **Package manager:** npm
- **Commit discipline:** Conventional Commits (see `.conventionalcommit.json`)

## Getting Started

> The application isn't scaffolded yet — these instructions are placeholders
> and will be filled in once `nest new` has been run.

```bash
npm install
npm run start:dev
```

Environment variables are documented in `.env.example` (added once the app
is bootstrapped).

## Status

🚧 Work in progress — this is a bootcamp project being built incrementally,
branch by branch. See `CONTRIBUTING.md` for the workflow.
