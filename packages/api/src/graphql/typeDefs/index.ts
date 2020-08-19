import { gql } from "@saruni/api";

export const typeDefs = gql`
  scalar Date

  scalar JSON

  type Mutation {
    createUser: Int!
  }

  type Query {
    hello: String!
  }
`;
