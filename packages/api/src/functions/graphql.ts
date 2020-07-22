import { ApolloServer, CreateHandlerOptions } from "@saruni/api";

import { resolvers, typeDefs } from "../graphql";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: {
    endpoint:
      process.env.NODE_ENV === "production" ? "/dev/graphql" : "/graphql",
  },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});

let options: CreateHandlerOptions;

if (process.env.NODE_ENV === "production") {
  options = {
    cors: {
      credentials: true,
      origin: "http://localhost:3000",
      allowedHeaders: "Content-Type, Authorization",
    },
  };
}

export const handler = server.createHandler(options);
