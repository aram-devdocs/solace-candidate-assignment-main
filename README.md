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
│   ├── ui/                     # React component library
│   ├── services/               # Business logic
│   ├── queries/                # Database queries
│   ├── hooks/                  # React hooks
│   ├── utils/                  # Utility functions
│   ├── typescript-config/      # Shared tsconfig
│   └── eslint-config/          # Shared ESLint config
└── docs/local/                 # Local documentation (gitignored)
```

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

Edit `.env` and configure your database connection:

```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/solaceassignment
```

### 4. Start PostgreSQL (Docker)

```bash
docker-compose up -d
```

### 5. Run Database Migrations

```bash
# Generate migration from schema
pnpm db:generate

# Apply migrations to database
pnpm db:migrate
```

### 6. Seed the Database (Optional)

Start the dev server first:

```bash
pnpm dev
```

Then in another terminal:

```bash
curl -X POST http://localhost:3000/api/seed
```

### 7. Start Development

```bash
# Start all apps in development mode
pnpm dev

# Or start specific app
pnpm --filter web dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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

### Database Management

```bash
pnpm db:generate      # Generate migration from schema changes
pnpm db:migrate       # Apply pending migrations
pnpm db:studio        # Open Drizzle Studio (database GUI)
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

### Option 1: Docker (Recommended)

```bash
docker-compose up -d
pnpm db:migrate
```

### Option 2: Local PostgreSQL

1. Install PostgreSQL locally
2. Create database: `createdb solaceassignment`
3. Update `DATABASE_URL` in `.env`
4. Run migrations: `pnpm db:migrate`

### Option 3: Cloud Database

1. Set up PostgreSQL on your cloud provider
2. Update `DATABASE_URL` in `.env` with connection string
3. Run migrations: `pnpm db:migrate`

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
