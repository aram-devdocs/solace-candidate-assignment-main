## Architecture

### Monorepo Structure

Turborepo monorepo with pnpm workspaces. Apps contain Next.js implementation. Packages contain reusable, framework-agnostic code organized by concern: database, types, ui, services, queries, hooks, utils, and shared configs.

### Separation of Concerns

**Packages (Definition):**

- Reusable, framework-agnostic code
- Single, well-defined responsibility per package
- No circular dependencies

**Apps (Implementation):**

- Application-specific logic
- Orchestrates packages
- Pages read like pseudocode

### Data Flow

```
Database Schema → @repo/types → All Consumers
       ↓
  @repo/database
       ↓
  @repo/queries
       ↓
   API Routes
       ↓
   UI Pages
```

## Type Safety

### Single Source of Truth

All types derive from Drizzle schema using InferSelectModel and InferInsertModel. Schema changes automatically propagate type updates across entire codebase. Import types from @repo/types in any package or app.

## Database Management

### Drizzle Kit Workflow

Generate migrations from schema changes with db:generate. Apply with db:migrate. Use db:studio for database GUI.

### Schema Changes

1. Modify schema
2. Generate migration
3. Review migration file
4. Apply migration
5. Types automatically update across codebase

## Development Workflow

### Local Development

Use pnpm install for dependencies. Start all apps with pnpm dev or filter specific packages. Run lint, type-check, test, and build commands across all packages with turbo orchestration.

### Database Setup

Start PostgreSQL via Docker Compose. Generate initial migration, apply it, then use Drizzle Studio for database management.

### Code Quality

**Pre-commit Hooks:**

- ESLint blocks on errors
- Prettier auto-formats code

**Manual Checks:**
Format with pnpm format. Check formatting with format:check.

**CRITICAL: NEVER bypass pre-commit hooks**

Pre-commit hooks enforce code quality, prevent bugs, and maintain consistency. Bypassing with --no-verify defeats automated checks and allows broken code into repository. Fix underlying issues rather than skipping validation.

## Testing Strategy

### Unit Tests

Co-locate tests with source files or place in **tests** directories. Use Vitest with describe/it blocks. Test files should match pattern _.test.ts or _.test.tsx.

### Running Tests

Run all tests with pnpm test. Filter specific packages. Enable watch mode or coverage reports as needed.

## Documentation Standards

### Code Documentation Requirements

**What to Document:**

- Public APIs and exported functions (JSDoc)
- Complex business logic ("why" not "what")
- Non-obvious algorithms or implementations
- Configuration options and their effects
- Type definitions for complex structures

**What NOT to Document:**

- Self-explanatory code
- Simple getters/setters
- Obvious variable names
- Implementation details that TypeScript types already convey

### JSDoc Standards

Use JSDoc for all public APIs. Include description, @param for each parameter with type and description, @returns with type and description, @example showing typical usage. Focus on what the function does and why, not implementation details.

### Inline Comments

Only for complex logic explaining "why" not "what". Example: "Use debounce to prevent excessive API calls" is good. "Set the search value" is redundant.

### Constants and Magic Values

NEVER use magic numbers or strings. Extract to named constants with descriptive names like DEBOUNCE_DELAY_MS or MIN_SEARCH_LENGTH. Values in code should be self-documenting.

### TODO Comments

DO NOT use TODO comments. Create tickets instead. Code should never reference future work. Use issue tracker for planned improvements.

### Technical Language

- Use precise technical terminology
- No emojis in code or documentation
- Professional, concise language
- Avoid conversational tone

### Standards Enforcement

**Automated:**

- ESLint rules enforce documentation requirements
- Prettier enforces formatting
- TypeScript enforces type documentation via strict mode
- Pre-commit hooks block commits with violations

**Manual Review:**

- PR reviews check documentation quality
- Architecture review for public API changes
- Documentation completeness verified before merge

## Package Development

### Creating New Packages

1. Create directory in packages
2. Add package.json with workspace dependencies
3. Add tsconfig.json extending shared config
4. Export from src/index.ts
5. Update dependent packages

### Package Dependencies

Use workspace protocol (workspace:\*) for internal dependencies. Separate runtime dependencies from devDependencies (configs, tooling).

## Coding Standards

### TypeScript

- Strict mode enabled
- No implicit any types
- Prefer type inference where clear
- JSDoc for complex functions

### React Components

- Functional components with hooks
- Props interfaces exported
- React.memo for performance-critical components
- Tailwind classes, no inline styles

### Naming Conventions

- Components: PascalCase
- Functions: camelCase
- Types: PascalCase
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case for utilities, PascalCase for components

### Import Order

1. External dependencies
2. Workspace packages (@repo/\*)
3. Relative imports

Organize imports for readability. Group by dependency type.

## CI/CD

### GitHub Actions

Runs on every PR and push to main:

- Lint
- Type check
- Tests
- Build

All checks must pass before merge.

### Turborepo Caching

- Local cache in .turbo/
- Parallelizes tasks
- Only rebuilds changed packages

## Environment Variables

### Required Variables

DATABASE_URL for PostgreSQL connection. NODE_ENV for environment mode.

### Usage

Access via process.env. Use NEXT*PUBLIC* prefix for client-side variables in Next.js.

## Common Tasks

### Adding a New Feature

1. Identify affected packages
2. Create types if needed
3. Implement business logic in services
4. Add database queries
5. Create UI components
6. Integrate in app
7. Write tests
8. Update documentation

### Fixing a Bug

1. Write failing test
2. Fix bug in appropriate package
3. Verify test passes
4. Run full test suite
5. Commit (pre-commit hooks run automatically)

### Refactoring

1. Ensure test coverage exists
2. Make incremental changes
3. Run tests after each change
4. Type check continuously
5. Keep commits small

## Troubleshooting

### Type Errors

Clear build caches (.next, dist directories) and reinstall dependencies.

### Database Issues

Reset Docker containers with down -v, restart, and reapply migrations.

### Build Failures

Clear all artifacts (.next, dist, .turbo), reinstall dependencies, rebuild.

## Performance

### Build Optimization

- Turborepo parallelizes tasks
- Only rebuilds changed packages
- Caches build outputs

### Runtime Optimization

- Code splitting via dynamic imports
- React.memo for expensive components
- Database query optimization
- Proper column indexing

## Security

### Best Practices

- No secrets in code
- Environment variables for sensitive data
- Validate all user input
- Parameterized queries only (Drizzle handles this)
- Keep dependencies updated

## Key Decision Records

**Turborepo over NX:** Simpler setup, Next.js LTS support, adequate for scale

**Drizzle over Prisma:** Better TypeScript integration, lighter bundle, SQL-first approach

**pnpm over npm/yarn:** Faster installs, better disk usage, required for Turborepo

**Vitest over Jest:** Native ESM, faster execution, better TypeScript integration

## Notes for AI Assistants

### Working with This Codebase

1. Always import types from @repo/types
2. Database changes require migration generation
3. Respect package boundaries
4. Follow test-driven development where appropriate
5. Use workspace protocol for internal dependencies (workspace:\*)

### When Making Changes

1. Identify affected packages
2. Update types if schema changes
3. Run type-check after changes
4. Run tests for affected packages
5. Update documentation if public API changes

### Commit Standards

- Descriptive commit messages
- Reference issue numbers
- One logical change per commit
- NEVER skip pre-commit hooks with --no-verify
