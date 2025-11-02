# Table of Contents

- [Logs](#logs)
  - [PR 1 - Project Infrastructure Setup](#pr-1---project-infrastructure-setup)
  - [PR 2 - Fix Github actions and deployment failures](#pr-2---fix-github-actions-and-deployment-failures)
  - [PR 3 - Fix search functionality](#pr-3---fix-search-functionality)
  - [PR 4 - Initial Migrations, Type Consolidation](#pr-4---initial-migrations-type-consolidation)
  - [PR 5 - UI Design System / Storybook](#pr-5---ui-design-system--storybook)
  - [PR 6 - app.solace.health UI](#pr-6---appsolacehealth-ui)
  - [PR 7 - Responsiveness and Accessibility](#pr-7---responsiveness-and-accessibility)
  - [PR 8 - Advocate Table Hardening](#pr-8---advocate-table-hardening)
  - [PR 9 - Abstract into Service layer](#pr-9---abstract-into-service-layer)
  - [PR 10 - Toasts, Error states, and UX Refinement](#pr-10---toasts-error-states-and-ux-refinement)
  - [PR 11 - Bug fix: Incorrect padding on slim devices](#pr-11---bug-fix-incorrect-padding-on-slim-devices)
  - [PR 12 - React Query integration](#pr-12---react-query-integration)
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

## [PR 6 - app.solace.health UI](https://github.com/aram-devdocs/solace-candidate-assignment-main/pull/20)

Everything is in place for a makeover, so lets go straight the source. Using the reference images, I am working to wireframe the UI to help present it as a feature of the existing application.

Taking html snippets directly from the app.solace.health site, I was able to get SVG's for the logo and menu icons, and the rest I was able to recreate one by one from reference and just CSS styling. While not a perfect 1:1 match, the theme is fairly close and should serve as a nice guide on the layout on how we should style the table.

Looking at the table, it in mobile view to the right, it goes on as long as the list, has no pagination controls, no filtering or sorting, and needs dynamic views based on the screen size to truly be a responsive application. I will kick most of this into seperate PRs so I can isolate the table itself outside of the theme code.

A fun side tangent I went on here was copying the greeding badge with its different states for morning, afternoon, and evening. I was able to find those three states (couldnt find a night one) for mobile and web views. This added a nice homage to the orignal, and helped me tie in some of the same theming to the new app.

I do notice some small differences upon review, but I feel I am 90% of the way there, so after a timebox UI session, I will move on to mobile responsiveness in the next pr.

## [PR 7 - Responsiveness and Accessibility](https://github.com/aram-devdocs/solace-candidate-assignment-main/pull/21)

A standard for web design is creating an application that can be used on any size screen, with any type of device. Screen readers, keyboard only navigation, and mobile responsiveness are all critical to accessibility and usability. So here we tackle that from the bottom up, ensuring each atomic component has these traits, and building layouts in the template to ensure that you can use it wherever you need.

Noticible changes here are tab navigation and focus states, static screen reader prompts for different states, mobile tablet and web views, switching the table to have an expandable row as the screen width gets smaller, so that we can view key data without scrolling horizontally, and just general cleanup and consolidation of breakpoints and design states.

For more in depth projects I would build custom scripts to test for things like responsiveness, theme consistency, but that is beyond the scope of this project. Instead, we will rely on manual testing (bad practice but timeboxing is imporant) and then add es-lint rules for accessibility for now. This ensures that bad code wont break the app in terms of usability. This caught a few bad practices I have made so far, so that makes up the rest of the file changes here.

## [PR 8 - Advocate Table Hardening](https://github.com/aram-devdocs/solace-candidate-assignment-main/pull/22)

Filtering, pagination, and sorting. Every table has them, but the way that they are implemented can make our break a view. I opt for minimlism, taking inspiration from the marketing page for solace.health, and adding non invaisive ui to handle these operations. We keep it front end only for now as the data set is low, but server side pagination will be a great step forward for scalability. If the project were to stay a NextJS app, server side loading would be great but since the backend is moving to NestJS, we will focus on seperate client side and server side optimizatios in preperation for the larger data sets we will face for scale testing. Shared hooks that rely on generics will take all of the leg work out of adding future tables, and customizable views can be built using the new UI components we have created.

Some enhancements I made here are having the chips on the table be clickable and auto filtering, adding ui elements that guide instead of dictate. The table itself is now more robust, with a focus on letting the user guide the data they see without overwhelming them with options.

## [PR 9 - Abstract into Service layer](https://github.com/aram-devdocs/solace-candidate-assignment-main/pull/23)

Simple refactoring. Prevent cross dependncies by combining database queries in a service layer for the back end, no functional changes now but prepares codebase for scale. Queries dont call each other, they combine results in a service.

## [PR 10 - Toasts, Error states, and UX Refinement](https://github.com/aram-devdocs/solace-candidate-assignment-main/pull/25)

Added toasts and containers to the UI package and error handling to the web app in general to protect agaisnt network errors and other unexpected behavior. This is just a hardening stage where we ensure that the app is robust enough to stand up to unexpected edge cases.

## [PR 11- Bug fix: Incorrect padding on slim devices](https://github.com/aram-devdocs/solace-candidate-assignment-main/pull/27)

Sent this out to do some testing on a bunch of devices, and got back fairly consistent feedback that on the right side of the home page, the Greeting.tsx badge, filters, and table are bleeding into the right and you couldn't scroll right to it. Small bug, but an indication that our theme is not fully responsive. A good chance to review, identify, and squash this at a low level so we don't have these kind of issues down the line.

The culprit ends up being tokens not fitting the right screen size, so a few quick css changes is the solution.

## [PR 12 - React Query integration](https://github.com/aram-devdocs/solace-candidate-assignment-main/pull/30)

Right now we are using fetch directly, which is fine for a small project and data set, but will not scale well on its own without a bunch of custom code. React Query is a community trusted tool that I have used on a ton of projects for stuff like this, as it simplifies cache handling on the front end and normalizes API usage for react. You lose out on a frame agnostic approach, but if all front ends are using React / React Native, then they can all use this. LTS for something like this would be tieing in an RPC layer for the back end, or something like TS-Rest to create contract first APIs, but that is beyond the scope of this project. Because of our layered architecture, we set it up to be an easy add for future developers.

The second part of the commit I expand using prefetching and filter options for the advocate. We are going to expand on the codebase to include a filter option on the back end, so we can selectively search and filter the data set as needed. Next pull request will handle that.

## [PR 13 - Harden Search Functionality]()

At this point, everything works. With a few thousand rows, I am able to search and filter the data set quickly. But, it has some key flaws. Every time a user calls the table, we fetch the entire data set. Even if we just fetched the entire data set, if the react-query cache is stale, it calls it again. This is a huge waste of resources, will cause increasingly expensive dev ops bills, and is not scalable. The solution comes in a mumber of parts.

1. Migration to turn the advocates table into a series of lookup and reference tables, so that we can start creating relationships to optimize how we filter and search the data set. Adding some indexes and constraints to the table to help with performance gets us running a lot faster, but we are still calling the same amount of data each time.

2. Redis, a tool already implemented in the app.solace.health, we can use the same methodology here. Preheating data as we search, query, and filter is all the faster with the assistance of a cache layer, so this was a no brainer. While an empty redis db does us no good, as we start navigating and searching we can get ahead of the next page here at the bare minimum, and it sets us up for better predictive search behaviors. Not suitable for MVP, but reach goals for this would be using geolocation, client information, and other data to predict what the user is likely to search for next, and loading that into the cache so we have quick options to get to.

3. Service layer optimizations, combining all of these steps. It is exactly why we created this layer in the first place, as we can now combine the database and cache packages here to create a more robust and scalable solution.

4. Once we did all that, we just update queries to use the new layer and pagination, and everything just clicks together.

To make things easier to test at scale, we use the faker.js package in database to auto scale up and down using env variables, and setting the docker compose settings to match the resources of our free tier on vercel storage.

TLDR; We are now using a hybrid approach to caching and pagination, where we use the client to filter and sort the data, and the server to provide the data. This is a more robust approach to scaling, and is a great foundation for future features. I was able to test at 100,000 advocates with no issues, and the app still feels snappy and responsive. I spent way more time than I needed to refining this, but scaling is cool so why not.
