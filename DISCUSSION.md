# Table of Contents

- [Logs](#logs)
  - [PR 1 - Project Infrastructure Setup](#pr-1---project-infrastructure-setup)
  - [PR 2 - Fix Github actions and deployment failures](#pr-2---fix-github-actions-and-deployment-failures)
  - [PR 3 - Fix search functionality](#pr-3---fix-search-functionality)
  - [PR 4 - Initial Migrations, Type Consolidation](#pr-4---initial-migrations-type-consolidation)
- [References](#references)
  - [GitHub Kanban Board](https://github.com/users/aram-devdocs/projects/3/views/1)
  - [Web App: https://solace.aramhammoudeh.com/](https://solace.aramhammoudeh.com/)
  - [Storybook: https://solace-storybook.aramhammoudeh.com](https://solace-storybook.aramhammoudeh.com)

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

## [PR 4 - Initial Migrations, Type Consolidation](https://github.com/aram-devdocs/solace-candidate-assignment-main/pull/17)

Now that we have all the bugs resolved, we can start using real persistent data. For now we are just reading but having it on a db will set the stage for future improvements. Drizzle kit is going to be our cheat code for getting this started. After adding some scripts to the -F database package, we can quickly load the portable postgres server and get to work. We have vercel set up with neon serverless postgres, so we should be able to match that so our code cleanly executes on the cloud as well, validating the architecture.

I generated two migrations with this system, the first to set the initial table, and the second to alter it choosing to make phone a unique constraint as my point of data integrity. Since I am using neon in vercel, I went ahead and changed the docker compose to use the neon proxy for the database, which is a great way to ensure the code I write here works on the cloud just the same. Centralizing the fixtures for testing and mock data with types created directly from drizzle, I set up seeding and migration to happen in the cicd rather than as implicit api endpoints. This was a bad pattern IMO as it requires a second step, and any time we can remove a second step and automate it, we add a testable area of the code that we can rely on.

## [PR 5 - UI Design System / Storybook](https://github.com/aram-devdocs/solace-candidate-assignment-main/pull/18)

The current UI is pretty bland, and looking at app.solace.health, I can get a feeling of what the theme should look like. I am strongly opinionated on Storybook as a tool, but either way the current implementation was not scalable, as none of the components can be reused in any future work.

This one is just some grunt work to get the to refactor the UI, but its an important step in turning a proof of concept into a real product. while doing this, I got the tailwind bug fixed in app so that it renders correctly. this cleaned up some, but we will still need to revisit this later for refinement. But for now, we have clean seperation of concerns, and now our page.tsx file reads like this:

```tsx
export default function Home() {
  const { searchTerm, filteredAdvocates, isLoading, error, handleSearchChange, handleResetSearch } =
    useAdvocateSearch();

  return (
    <AdvocateListTemplate
      advocates={filteredAdvocates}
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      onResetSearch={handleResetSearch}
      isLoading={isLoading}
      error={error}
    />
  );
}
```

This makes a huge difference in readability and scaling, and allows us to target small chunks of the workspace at a time for refinement, without worrying about breaking the entire system.

## [PR 6 - app.solace.health UI]()

Everything is in place for a makeover, so lets go straight the source. Using the reference images, I am working to wireframe the UI to help present it as a feature of the existing application.

Taking html snippets directly from the app.solace.health site, I was able to get SVG's for the logo and menu icons, and the rest I was able to recreate one by one from reference and just CSS styling. While not a perfect 1:1 match, the theme is fairly close and should serve as a nice guide on the layout on how we should style the table.

Looking at the table, it in mobile view to the right, it goes on as long as the list, has no pagination controls, no filtering or sorting, and needs dynamic views based on the screen size to truly be a responsive application. I will kick most of this into seperate PRs so I can isolate the table itself outside of the theme code.
