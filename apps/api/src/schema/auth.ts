import { gql } from 'graphql-tag';

export const authTypeDefs = gql`
  type AuthPayload {
    id: ID!
    token: String
    first_name: String
    last_name: String
    organization: String
    email: String!
    role: String!
    isVerified: Boolean
  }

  type Query {
    hello: String
  }

  type AuthResponse {
    status: Float!
    message: String!
    data: AuthPayload!
  }

  type VerifyCodeResponse {
    success: Boolean!
    message: String
  }

  type ResetPasswordResponse {
    success: Boolean!
    message: String
  }

  type LogoutResponse {
    success: Boolean!
    message: String
  }

  type ForgotPasswordResponse {
    success: Boolean!
    email: String
    message: String
    id: ID
  }

  type CodeResendResponse {
    success: Boolean!
    message: String
    id: ID
  }

  type Mutation {
    register(
      first_name: String
      last_name: String
      email: String!
      password: String!
      organization: String!
    ): AuthResponse!

    login(email: String!, password: String!): AuthResponse!

    verifyCode(id: ID!, code: String!): VerifyCodeResponse!

    forgotPassword(email: String!): ForgotPasswordResponse!
    resetPassword(email: String!, password: String!): ResetPasswordResponse!

    resendCode(email: String!): CodeResendResponse!
    logout: LogoutResponse!
  }
`;
