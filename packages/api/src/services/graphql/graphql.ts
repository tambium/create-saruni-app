import { ApolloServer, CreateHandlerOptions, Config } from "@saruni/api";

import { db } from "./../../db";
import { resolvers, typeDefs } from "../../graphql";

let options: CreateHandlerOptions;

let config: Config = {
  typeDefs,
  resolvers,
  introspection: true,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
};

if (process.env.STAGE !== "prod") {
  config.playground = {
    endpoint: `/${process.env.STAGE}/graphql`,
  };
}

if (process.env.NODE_ENV === "production") {
  options = {
    cors: {
      credentials: true,
      origin: "http://localhost:3000",
      allowedHeaders: "Content-Type, Authorization",
    },
  };
}

const server = new ApolloServer(config);

export const handler = (event, ctx, cb) => {
  let result;

  try {
    result = server.createHandler(options)(event, ctx, cb);
  } catch (e) {
  } finally {
    db.disconnect();
  }

  return result;
};
