import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  scalar GraphQLDateTime

  type UserData {
    id: ID!
    organization: String
    isVerified: Boolean
    createdAt: GraphQLDateTime!
    updatedAt: GraphQLDateTime!
    first_name: String
    last_name: String
    email: String
  }

  input CreateUserInput {
    first_name: String
    last_name: String
    email: String!
    organization: String!
    password: String!
  }

  input UpdateUserInput {
    first_name: String
    last_name: String
    email: String
    organization: String
    password: String
  }

  type Query {
    getUser(id: ID!): UserData
    getUsers: [UserData]
  }

  type Mutation {
    createUser(input: CreateUserInput!): UserData
    updateUser(id: ID!, input: UpdateUserInput!): UserData
    deleteUser(id: ID!): Boolean
  }
`;
