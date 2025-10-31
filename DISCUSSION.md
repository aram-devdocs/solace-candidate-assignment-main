# References

[GitHub Kanban Board](https://github.com/users/aram-devdocs/projects/3/views/1)\

# Logs

## [PR 1 - Project Infrastructure Setup](https://github.com/aram-devdocs/solace-candidate-assignment-main/pull/2)

In every project I work on, the first thing I do is evaluate the developer experience. The initial project used a singleton repository pattern, which is fine for an MVP, but preventing tech debt is intentional.

Things like linting, type checking, formatting, testing, and build checks should be happening at each stage, and automatically enforced. Code patterns should not be opt-in, and the easiest way to do this is setting up pre-commit hooks and architecting to scale from the get-go.

I opted to go with pnpm and Turborepo for their quick setup, but for a more robust enterprise system I have found that NX is a great tool for this. Either way, the goal is setting up the project so that good design is built in, separating the implementation from the definition, so packages to abstract all of our code is a great place to start.

I don't handle that here, but instead just boilerplate and make sure our codebase builds. Looking at main, I saw that styling was not implemented at all, so I will be addressing that first, and moving all our UI to the UI package to separate it from business logic of our code.

I was able to find https://app.solace.health/dashboard, which I will use as my styling reference in the next pull request. Initial images can be found in `docs/images`, where I can see that I have rather bland HTML elements, and no mobile responsiveness. UI/UX is huge in apps like this for adoptability, so I will prioritize that as functionality is limited.

I will be tracking my progress on the kanban board. Next bugs identified will be around:

- The search functionality not working
- Adding proper type definitions and removing `any` types
- Abstracting the code into packages to promote strong coding patterns
- Removing DOM manipulation in favor of `@packages/hooks`
- Moving API requests into `@packages/queries` for the front end and `@packages/database` and `@database/services` for the backend

I changed payload to specialties here to remove generics, but I need to set up proper migrations to enforce schema changes in version control.

Once I have the bugs fixed and feature set solid, I will work on refining the UI layer:

- Adding Storybook so I can build and test UI components before implementing
- Add loading and error states with toasts built into the queries to have a clean UX
- Add some quality of life fixes such as:
  - Adding proper debouncing
  - Form validation
  - Flattened and case insensitive search for optimization
  - Pagination for data respect
  - Harden the table experience for better filtering and sorting
  - General UI overhaul

A reach goal will be adding 1:1 UI from the app.solace.health, but taking general theming references will be a good start.

Since the logic already exists, TDD only makes sense for future work so I will backfill tests for the API and hooks layer, using mock generators derived from the type system to ensure schema changes are forcing test updates.

Reach goals will be adding things like:

- OpenAPI
- Swapping fetch for React Query
- Using Terraform to set up some IoC for deployment

For now, I will focus on MVP deliverables for submission.

## [PR 2 - Fix Github actions and deployment failures](https://github.com/aram-devdocs/solace-candidate-assignment-main/pull/15)

Before I get started, I wanted to fix up a few build and typecheck failures. This resolves the advocate import and type annotations, getting a bit ahead of myself on some of the bugs I wanted to fix, but ES Lint / Build / Typecheck failures should be addressed immediately IMO. Tech debt avoidance is intentional, so little steps like this make a big difference.

## [PR 3 - Fix search functionality](https://github.com/aram-devdocs/solace-candidate-assignment-main/pull/16)

This is the first 'real' pull request where we start addressing some major concerns, first and foremost being the fact that the search doesn't work. The biggest culprit was the direct DOM manipulation and fetching. Checking by IDs or other static strings is far from typesafe, so we moved that into a hook with values saved as state so we can isolate the data in memory as we track it.

While we were here, we went ahead and moved the code into the `@repo/hooks` package to keep UI and Business Logic separate, cleaning up our `page.tsx`. I noticed that debounce was not implemented, so a quick hook was added to handle that. While I was abstracting code, I went ahead and moved the fetch function into `@repo/queries`, and handled the hook that gathered that into the `useAdvocateSearch` hook.

At this point, we have created:

- `@repo/utils` package to isolate the filtering logic
- `@repo/queries` package to handle API requests
- `@repo/hooks` package to handle business logic
- `@repo/types` package to handle the data types

While this is a feature-low product, it is a great foundation to build on IMO for planning for scale. You will see this in every log probably, but tech debt avoidance is intentional, so little steps like this make a big difference.

I then went to add some quality of life fixes, resolving the TH/TR HTML hydration bug and adding JSDoc comments to have everything feel production ready. I generated some unit tests using Claude to start hardening the logic we just wrote. These items are fantastic use cases for AI in development, as it lets me focus on system architecture, design patterns and code structure and quality, setting up enforcement boundaries to ensure that the code going into main is the code we would expect of an experienced dev, and letting the AI take isolated low context tasks.
