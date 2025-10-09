import { gql } from 'graphql-tag';

export const eventTypeDefs = gql`
  type User {
    id: ID!
    first_name: String
    last_name: String
    organization: String!
    email: String!
  }

  type MCQQuestion {
    value: String
    label: String
  }

  type Guideline {
    id: ID!
    seq_id: Int!
    type: String!
    title: String!
    body: String
    correct_answer: String
    mcq_question_list: [MCQQuestion]
  }

  type GuidelineWithoutAnswers {
    id: ID!
    seq_id: Int!
    type: String!
    title: String!
    body: String
    mcq_question_list: [MCQQuestion]
  }

  type Event {
    id: ID!
    name: String!
    location: String
    date: String
    start_time: String
    guide_lines: [Guideline]
    user: User
    sharable_link: String!
  }

  type EventWithoutAnswer {
    id: ID!
    name: String!
    location: String
    date: String
    start_time: String
    guide_lines: [GuidelineWithoutAnswers]
    sharable_link: String!
  }

  type EventResponse {
    status: Float!
    message: String!
    data: Event
  }

  type EventDeleteResponse {
    status: Float!
    message: String!
  }

  input EventInput {
    name: String!
    location: String
    date: String
    start_time: String
    guide_lines: [GuidelineInput]
  }

  input MCQQuestionInput {
    value: String
    label: String
  }

  input GuidelineInput {
    seq_id: Int!
    type: String!
    title: String!
    body: String
    correct_answer: String
    mcq_question_list: [MCQQuestionInput]
  }

  input EventUpdate {
    name: String
    location: String
    date: String
    start_time: String
    guide_lines: [GuidelineInput]
    user_id: ID
  }

  input EventReorderInput {
    _id: ID!
    seq_id: Int!
  }

  type Query {
    getEvent(id: ID!): Event
    getEvents: [Event]!
    getEventWithoutAnswers(id: ID!): EventWithoutAnswer!
  }

  type Mutation {
    createEvent(event: [EventInput]!): EventResponse
    updateEvent(id: ID!, event: EventUpdate!): EventResponse
    deleteEvent(id: ID!): EventDeleteResponse
    reorderGuideLines(
      eventId: ID!
      guide_lines: [EventReorderInput]!
    ): EventResponse
  }
`;
