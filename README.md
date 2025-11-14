# Goud Network - Advocate Platform Demo

> A tech demo built in a hackathon, this app showcases fullstack web development with a focus on scalable infrastructure and a strong developer experience. The app is mobile, tablet, and web responsive with accessible design system features

## Status & Tech Stack

[![CI/CD](https://github.com/aram-devdocs/goud-network-main/actions/workflows/ci.yml/badge.svg)](https://github.com/aram-devdocs/goud-network-main/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## Quick Links

[![Live App](https://img.shields.io/badge/🌐_Live_App-goud--network.aramhammoudeh.com-brightgreen)](https://goud-network.aramhammoudeh.com/)
[![API Docs](https://img.shields.io/badge/📖_API_Docs-OpenAPI_3.1-blue)](https://goud-network.aramhammoudeh.com/api/docs)
[![Storybook](https://img.shields.io/badge/📚_Storybook-Component_Library-ff4785?logo=storybook&logoColor=white)](https://goud-network-storybook.aramhammoudeh.com)
[![Project Board](https://img.shields.io/badge/📋_Project_Board-Kanban-0366d6)](https://github.com/users/aram-devdocs/projects/3/views/1)
[![Development Log](https://img.shields.io/badge/📝_Development_Log-DISCUSSION.md-yellow)](./DISCUSSION.md)

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
  - [UI Component Library](#ui-component-library)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
  - [Development](#development)
  - [UI Development](#ui-development)
  - [Database Management](#database-management)
  - [Package-Specific Commands](#package-specific-commands)
- [Development Workflow](#development-workflow)
  - [Making Schema Changes](#making-schema-changes)
  - [Creating a New Package](#creating-a-new-package)
  - [Running Tests](#running-tests)
- [Pre-commit Hooks](#pre-commit-hooks)
- [Database Setup Options](#database-setup-options)
- [Architecture](#architecture)
  - [Type Safety](#type-safety)
  - [Data Flow](#data-flow)
  - [Separation of Concerns](#separation-of-concerns)
- [CI/CD](#cicd)
- [Troubleshooting](#troubleshooting)

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.5 (strict mode)
- **Database:** PostgreSQL with Drizzle ORM
- **Styling:** Tailwind CSS
- **Monorepo:** Turborepo with pnpm workspaces
- **Testing:** Vitest
- **CI/CD:** GitHub Actions
- **Code Quality:** ESLint, Prettier, Husky

## Project Structure

```
/
├── apps/
│   └── web/                    # Next.js application
├── packages/
│   ├── database/               # Drizzle schema and client
│   ├── types/                  # Shared TypeScript types
│   ├── ui/                     # React component library (Atomic Design + Storybook)
│   ├── services/               # Business logic
│   ├── queries/                # Database queries
│   ├── hooks/                  # React hooks
│   ├── utils/                  # Utility functions
│   ├── typescript-config/      # Shared tsconfig
│   └── eslint-config/          # Shared ESLint config
└── docs/local/                 # Local documentation (gitignored)
```

### UI Component Library

The `@repo/ui` package contains a comprehensive design system built with:

- **Atomic Design**: Components organized as atoms, molecules, organisms, and templates
- **Design Tokens**: Centralized theming via Tailwind CSS configuration
- **Storybook**: Interactive component documentation and development environment
- **Type Safety**: Full TypeScript support with exported prop types

All components use thematic Tailwind classes—no inline styles or magic values.

## Prerequisites

- Node.js >= 20.18.0 (specified in `.nvmrc`)
- pnpm >= 9.0.0
- Docker (for local PostgreSQL)

## Quick Start

### 1. Install pnpm

```bash
npm install -g pnpm
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

The default `.env` configuration works out of the box for local development:

```bash
DATABASE_URL=postgres://postgres:postgres@db.localtest.me:5432/main
NODE_ENV=development
```

### 4. Start Development

```bash
# Start database, run migrations, seed data, and start all apps
pnpm dev
```

This single command:

- Starts PostgreSQL + Neon proxy via Docker Compose
- Runs database migrations automatically
- Seeds the database with initial data
- Starts all development servers (web app on port 3000)

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Note:** The database containers keep running after you stop the dev command (Ctrl+C). To completely reset the database, run:

```bash
pnpm --filter @repo/database dev:clean
```

## Available Scripts

### Development

```bash
pnpm dev              # Start development servers
pnpm build            # Build all packages and apps
pnpm lint             # Run ESLint across all packages
pnpm type-check       # TypeScript type checking
pnpm test             # Run all tests
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting
```

### UI Development

```bash
pnpm --filter @repo/ui storybook        # Start Storybook dev server
pnpm --filter @repo/ui build-storybook  # Build Storybook for production
```

### Database Management

```bash
pnpm --filter @repo/database dev        # Start database (auto-migrates & seeds)
pnpm --filter @repo/database dev:clean  # Stop database and remove all data
pnpm db:generate                         # Generate migration from schema changes
pnpm db:migrate                          # Apply pending migrations
pnpm db:studio                           # Open Drizzle Studio (database GUI)
```

### Package-Specific Commands

```bash
# Run command in specific package/app
pnpm --filter web dev
pnpm --filter @repo/database type-check
```

## Development Workflow

### Making Schema Changes

1. Edit schema
2. Generate migration: `pnpm db:generate`
3. Review migration file
4. Apply migration: `pnpm db:migrate`
5. Types automatically update across codebase

### Creating a New Package

1. Create directory in packages
2. Add package.json with workspace dependencies
3. Add tsconfig.json extending shared config
4. Export public API from src/index.ts
5. Install with pnpm install

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in specific package
pnpm --filter web test

# Run tests in watch mode
pnpm --filter web test --watch

# Generate coverage
pnpm --filter web test --coverage
```

## Pre-commit Hooks

Pre-commit hooks automatically run before each commit:

- ESLint (blocks on errors)
- Prettier (auto-formats code)

## Database Setup Options

### Option 1: Docker with Neon Proxy (Recommended)

The default setup uses Docker Compose with Neon's local development proxy, ensuring your local environment matches production (Vercel + Neon):

```bash
pnpm dev  # Automatically starts Docker, migrates, and seeds
```

### Option 2: Cloud Database (Vercel/Production)

For production or cloud development:

1. Set up Neon PostgreSQL database
2. Update `DATABASE_URL` in `.env` with your Neon connection string
3. Run migrations: `pnpm db:migrate`
4. Seed database: `pnpm --filter @repo/database db:seed`

## Architecture

### Type Safety

All types derive from Drizzle schema:

```typescript
// Schema defines structure
export const advocates = pgTable("advocates", { ... });

// Types package exports inferred types
export type Advocate = InferSelectModel<typeof advocates>;

// Import types
import { type Advocate } from "@repo/types";
```

### Data Flow

```
Database Schema → @repo/types → All Packages/Apps
                ↓
         @repo/database
                ↓
         @repo/queries
                ↓
         API Routes
                ↓
         UI Pages
```

### Separation of Concerns

- **packages/**: Reusable, framework-agnostic code
- **apps/**: Application-specific implementation
- Pages orchestrate packages, reading like pseudocode

## CI/CD

GitHub Actions runs on every PR:

- Linting
- Type checking
- Unit tests
- Build validation

All checks must pass before merge.

## Troubleshooting

### Type Errors After Schema Changes

```bash
# Clear build artifacts
rm -rf **/.next **/dist
pnpm install
```

### Database Connection Issues

```bash
# Check Docker container
docker-compose ps

# View logs
docker-compose logs db

# Restart containers
docker-compose restart
```

### Build Failures

```bash
# Clear all caches
rm -rf **/.next **/dist **/.turbo

# Reinstall dependencies
rm -rf node_modules **/node_modules
pnpm install

# Rebuild
pnpm build
```

### Husky Not Running

```bash
# Reinitialize Husky
pnpm prepare
```
