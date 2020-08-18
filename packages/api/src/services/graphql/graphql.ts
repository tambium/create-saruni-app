import { ApolloServer, CreateHandlerOptions, Config } from "@saruni/api";

import { db } from "./../../db";
import { resolvers, typeDefs } from "../../graphql";

import saruniJson from "../../../../../saruni.json";

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

if (process.env.STAGE === "dev") {
  config.playground = {
    endpoint: `/dev/graphql`,
  };
}

if (process.env.STAGE === "local") {
  config.playground = {
    endpoint: `/graphql`,
  };
}

if (process.env.STAGE === "prod") {
  options = {
    cors: {
      credentials: true,
      origin: saruniJson.serverless.prod.frontendUrl,
      allowedHeaders: "Content-Type, Authorization",
    },
  };
} else if (process.env.STAGE === "dev") {
  options = {
    cors: {
      credentials: true,
      origin: [
        `http://localhost:${saruniJson.devServerPort.web}`,
        saruniJson.serverless.dev.frontendCloudfrontUrl,
        saruniJson.serverless.dev.frontendUrl,
      ],
      allowedHeaders: "Content-Type, Authorization",
    },
  };
}

const server = new ApolloServer(config);

export const handler = (event, ctx, cb) => {
  try {
    server.createHandler(options)(event, ctx, cb);
  } catch (e) {
    db.$disconnect();
    throw e;
  }
};
