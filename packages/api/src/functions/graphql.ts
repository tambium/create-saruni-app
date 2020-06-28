import { ApolloServer, gql } from "@saruni/api";

import { db } from "../db";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, Saruni!",
  },
};

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

export const handler = server.createHandler();
