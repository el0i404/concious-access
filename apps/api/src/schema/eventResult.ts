import { gql } from 'graphql-tag';
export const eventResultTypeDefs = gql`
  scalar GraphQLDateTime

  input EventResultInput {
    id: ID!
    correct_answer: String!
  }

  type EventResult {
    event_id: ID!
    is_passed: Boolean!
    is_qr_code_scanned: Boolean!
    qr_code_number: String
    createdAt: GraphQLDateTime
  }

  type ScanQRCode {
    qr_code_scanned_time: GraphQLDateTime!
    success: Boolean!
    message: String
  }

  type Mutation {
    submitResult(
      event_id: ID!
      event_result: [EventResultInput!]!
    ): EventResult!

    scanQRCode(qr_code_number: String): ScanQRCode!
  }
`;
