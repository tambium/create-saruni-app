import { gql } from "@saruni/api";

export const typeDefs = gql`
  scalar Date

  scalar JSON

  type Query {
    hello: String!
  }
`;
