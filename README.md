# Create Saruni App

## Admin

- `blocks [?]`
  Modifiable content consumed by the web app.

## Api

- `prisma/schema.prisma`
  Configuration for the database schema.

- `src/db`
  Reusable database object.

- `src/functions`
  One-to-one mapping with lambda functions.

- `src/graphql`
  Resolvers for the GraphQL schema.

- `src/services`
  Reusable business logic.

## Shared

- `graphql`
  Generated types for queries and mutations.

- `validations`
  Schemas for value parsing and validation.

## Web

- `components`
  Reusable building blocks for the web app (e.g. buttons, text fields).

- `layouts`
  Reusable page structures for the web app (e.g. documentation layout, profile layout).

- `pages`
  Routes that map to a URL.

- `views`
  Holding place for specific usage of a component that is adopted more than once within app (e.g. help modal, error alert).
