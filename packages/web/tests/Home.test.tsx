import React from "react";
import { jwtClient } from "@saruni/auth";
import { createWebTestContext } from "@saruni/test";
import { generateApiProvider } from "@saruni/web";
import { render } from "@testing-library/react";
import { graphql } from "msw";

import Home from "../src/pages/index";

const ApolloProvider = generateApiProvider({ apolloClient: jwtClient });

describe("<Home />", () => {
  createWebTestContext([
    graphql.query("Hello", (_req, res, ctx) => {
      return res(ctx.data({ hello: "Hello, Saruni!" }));
    }),
  ]);

  test(`Should render "Hello, Saruni!"`, async () => {
    const { findByText } = render(
      <ApolloProvider>
        <Home />
      </ApolloProvider>
    );

    const message = await findByText(/Hello, Saruni!/gi);

    expect(message).toBeInTheDocument();
  });
});
