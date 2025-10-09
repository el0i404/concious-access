/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  GraphQLDateTime: { input: any; output: any };
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  email: Scalars['String']['output'];
  first_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  token?: Maybe<Scalars['String']['output']>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  data: AuthPayload;
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type CodeResendResponse = {
  __typename?: 'CodeResendResponse';
  id?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  organization: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Event = {
  __typename?: 'Event';
  date?: Maybe<Scalars['String']['output']>;
  guide_lines?: Maybe<Array<Maybe<Guideline>>>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  sharable_link: Scalars['String']['output'];
  start_time?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type EventDeleteResponse = {
  __typename?: 'EventDeleteResponse';
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type EventInput = {
  date?: InputMaybe<Scalars['String']['input']>;
  guide_lines?: InputMaybe<Array<InputMaybe<GuidelineInput>>>;
  location?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  start_time?: InputMaybe<Scalars['String']['input']>;
};

export type EventReorderInput = {
  _id: Scalars['ID']['input'];
  seq_id: Scalars['Int']['input'];
};

export type EventResponse = {
  __typename?: 'EventResponse';
  data?: Maybe<Event>;
  message: Scalars['String']['output'];
  status: Scalars['Float']['output'];
};

export type EventResult = {
  __typename?: 'EventResult';
  createdAt?: Maybe<Scalars['GraphQLDateTime']['output']>;
  event_id: Scalars['ID']['output'];
  is_passed: Scalars['Boolean']['output'];
  is_qr_code_scanned: Scalars['Boolean']['output'];
  qr_code_number?: Maybe<Scalars['String']['output']>;
};

export type EventResultInput = {
  correct_answer: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type EventUpdate = {
  date?: InputMaybe<Scalars['String']['input']>;
  guide_lines?: InputMaybe<Array<InputMaybe<GuidelineInput>>>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
};

export type EventWithoutAnswer = {
  __typename?: 'EventWithoutAnswer';
  date?: Maybe<Scalars['String']['output']>;
  guide_lines?: Maybe<Array<Maybe<GuidelineWithoutAnswers>>>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  sharable_link: Scalars['String']['output'];
  start_time?: Maybe<Scalars['String']['output']>;
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Guideline = {
  __typename?: 'Guideline';
  body?: Maybe<Scalars['String']['output']>;
  correct_answer?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mcq_question_list?: Maybe<Array<Maybe<McqQuestion>>>;
  seq_id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type GuidelineInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  correct_answer?: InputMaybe<Scalars['String']['input']>;
  mcq_question_list?: InputMaybe<Array<InputMaybe<McqQuestionInput>>>;
  seq_id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type GuidelineWithoutAnswers = {
  __typename?: 'GuidelineWithoutAnswers';
  body?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mcq_question_list?: Maybe<Array<Maybe<McqQuestion>>>;
  seq_id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type McqQuestion = {
  __typename?: 'MCQQuestion';
  label?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type McqQuestionInput = {
  label?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent?: Maybe<EventResponse>;
  createUser?: Maybe<UserData>;
  deleteEvent?: Maybe<EventDeleteResponse>;
  deleteUser?: Maybe<Scalars['Boolean']['output']>;
  forgotPassword: ForgotPasswordResponse;
  login: AuthResponse;
  logout: LogoutResponse;
  register: AuthResponse;
  reorderGuideLines?: Maybe<EventResponse>;
  resendCode: CodeResendResponse;
  resetPassword: ResetPasswordResponse;
  scanQRCode: ScanQrCode;
  submitResult: EventResult;
  updateEvent?: Maybe<EventResponse>;
  updateUser?: Maybe<UserData>;
  verifyCode: VerifyCodeResponse;
};

export type MutationCreateEventArgs = {
  event: Array<InputMaybe<EventInput>>;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  organization: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationReorderGuideLinesArgs = {
  eventId: Scalars['ID']['input'];
  guide_lines: Array<InputMaybe<EventReorderInput>>;
};

export type MutationResendCodeArgs = {
  email: Scalars['String']['input'];
};

export type MutationResetPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationScanQrCodeArgs = {
  qr_code_number?: InputMaybe<Scalars['String']['input']>;
};

export type MutationSubmitResultArgs = {
  event_id: Scalars['ID']['input'];
  event_result: Array<EventResultInput>;
};

export type MutationUpdateEventArgs = {
  event: EventUpdate;
  id: Scalars['ID']['input'];
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type MutationVerifyCodeArgs = {
  code: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  getEvent?: Maybe<Event>;
  getEventWithoutAnswers: EventWithoutAnswer;
  getEvents: Array<Maybe<Event>>;
  getUser?: Maybe<UserData>;
  getUsers?: Maybe<Array<Maybe<UserData>>>;
  hello?: Maybe<Scalars['String']['output']>;
};

export type QueryGetEventArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetEventWithoutAnswersArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGetUserArgs = {
  id: Scalars['ID']['input'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ScanQrCode = {
  __typename?: 'ScanQRCode';
  message?: Maybe<Scalars['String']['output']>;
  qr_code_scanned_time: Scalars['GraphQLDateTime']['output'];
  success: Scalars['Boolean']['output'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  first_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  organization: Scalars['String']['output'];
};

export type UserData = {
  __typename?: 'UserData';
  createdAt: Scalars['GraphQLDateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isVerified?: Maybe<Scalars['Boolean']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['GraphQLDateTime']['output'];
};

export type VerifyCodeResponse = {
  __typename?: 'VerifyCodeResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  organization: Scalars['String']['input'];
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'AuthResponse';
    data: { __typename?: 'AuthPayload'; id: string };
  };
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'AuthResponse';
    message: string;
    status: number;
    data: {
      __typename?: 'AuthPayload';
      isVerified?: boolean | null;
      email: string;
      role: string;
      token?: string | null;
    };
  };
};

export type CreateEventMutationVariables = Exact<{
  event: Array<InputMaybe<EventInput>> | InputMaybe<EventInput>;
}>;

export type CreateEventMutation = {
  __typename?: 'Mutation';
  createEvent?: {
    __typename?: 'EventResponse';
    data?: {
      __typename?: 'Event';
      guide_lines?: Array<{
        __typename?: 'Guideline';
        seq_id: number;
        id: string;
        title: string;
        type: string;
      } | null> | null;
    } | null;
  } | null;
};

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type ForgotPasswordMutation = {
  __typename?: 'Mutation';
  forgotPassword: {
    __typename?: 'ForgotPasswordResponse';
    email?: string | null;
    id?: string | null;
    success: boolean;
  };
};

export type ResendCodeMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;

export type ResendCodeMutation = {
  __typename?: 'Mutation';
  resendCode: { __typename?: 'CodeResendResponse'; success: boolean };
};

export type VerifyCodeMutationVariables = Exact<{
  verifyCodeId: Scalars['ID']['input'];
  code: Scalars['String']['input'];
}>;

export type VerifyCodeMutation = {
  __typename?: 'Mutation';
  verifyCode: {
    __typename?: 'VerifyCodeResponse';
    message?: string | null;
    success: boolean;
  };
};

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type ResetPasswordMutation = {
  __typename?: 'Mutation';
  resetPassword: {
    __typename?: 'ResetPasswordResponse';
    message?: string | null;
    success: boolean;
  };
};

export type GetEventsQueryVariables = Exact<{ [key: string]: never }>;

export type GetEventsQuery = {
  __typename?: 'Query';
  getEvents: Array<{
    __typename?: 'Event';
    id: string;
    name: string;
    location?: string | null;
    date?: string | null;
    sharable_link: string;
    start_time?: string | null;
    guide_lines?: Array<{
      __typename?: 'Guideline';
      seq_id: number;
      type: string;
      title: string;
      body?: string | null;
      correct_answer?: string | null;
      mcq_question_list?: Array<{
        __typename?: 'MCQQuestion';
        value?: string | null;
        label?: string | null;
      } | null> | null;
    } | null> | null;
  } | null>;
};

export type DeleteEventMutationVariables = Exact<{
  deleteEventId: Scalars['ID']['input'];
}>;

export type DeleteEventMutation = {
  __typename?: 'Mutation';
  deleteEvent?: {
    __typename?: 'EventDeleteResponse';
    status: number;
    message: string;
  } | null;
};

export type ScanQrCodeMutationVariables = Exact<{
  qrCodeNumber?: InputMaybe<Scalars['String']['input']>;
}>;

export type ScanQrCodeMutation = {
  __typename?: 'Mutation';
  scanQRCode: {
    __typename?: 'ScanQRCode';
    qr_code_scanned_time: any;
    success: boolean;
    message?: string | null;
  };
};

export type GetEventWithoutAnswersQueryVariables = Exact<{
  getEventWithoutAnswersId: Scalars['ID']['input'];
}>;

export type GetEventWithoutAnswersQuery = {
  __typename?: 'Query';
  getEventWithoutAnswers: {
    __typename?: 'EventWithoutAnswer';
    id: string;
    name: string;
    location?: string | null;
    date?: string | null;
    start_time?: string | null;
    sharable_link: string;
    guide_lines?: Array<{
      __typename?: 'GuidelineWithoutAnswers';
      id: string;
      seq_id: number;
      type: string;
      title: string;
      body?: string | null;
      mcq_question_list?: Array<{
        __typename?: 'MCQQuestion';
        value?: string | null;
        label?: string | null;
      } | null> | null;
    } | null> | null;
  };
};

export type SubmitResultMutationVariables = Exact<{
  eventId: Scalars['ID']['input'];
  eventResult: Array<EventResultInput> | EventResultInput;
}>;

export type SubmitResultMutation = {
  __typename?: 'Mutation';
  submitResult: {
    __typename?: 'EventResult';
    event_id: string;
    is_passed: boolean;
    is_qr_code_scanned: boolean;
    qr_code_number?: string | null;
    createdAt?: any | null;
  };
};

export type GetEventQueryVariables = Exact<{
  getEventId: Scalars['ID']['input'];
}>;

export type GetEventQuery = {
  __typename?: 'Query';
  getEvent?: {
    __typename?: 'Event';
    id: string;
    name: string;
    sharable_link: string;
    start_time?: string | null;
    location?: string | null;
    date?: string | null;
    guide_lines?: Array<{
      __typename?: 'Guideline';
      body?: string | null;
      correct_answer?: string | null;
      id: string;
      seq_id: number;
      title: string;
      type: string;
      mcq_question_list?: Array<{
        __typename?: 'MCQQuestion';
        label?: string | null;
        value?: string | null;
      } | null> | null;
    } | null> | null;
    user?: {
      __typename?: 'User';
      email: string;
      first_name?: string | null;
      id: string;
      last_name?: string | null;
      organization: string;
    } | null;
  } | null;
};

export type UpdateEventMutationVariables = Exact<{
  updateEventId: Scalars['ID']['input'];
  event: EventUpdate;
}>;

export type UpdateEventMutation = {
  __typename?: 'Mutation';
  updateEvent?: {
    __typename?: 'EventResponse';
    message: string;
    status: number;
  } | null;
};

export const RegisterDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Register' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'organization' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'register' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'password' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'organization' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'organization' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'password' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isVerified' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'token' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateEventDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateEvent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'event' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'EventInput' },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createEvent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'event' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'event' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'data' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'guide_lines' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'seq_id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateEventMutation, CreateEventMutationVariables>;
export const ForgotPasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ForgotPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'forgotPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const ResendCodeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ResendCode' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resendCode' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ResendCodeMutation, ResendCodeMutationVariables>;
export const VerifyCodeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'VerifyCode' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'verifyCodeId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'code' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'verifyCode' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'verifyCodeId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'code' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'code' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VerifyCodeMutation, VerifyCodeMutationVariables>;
export const ResetPasswordDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ResetPassword' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'resetPassword' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'password' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const GetEventsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetEvents' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getEvents' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sharable_link' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'start_time' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'guide_lines' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'seq_id' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'correct_answer' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'mcq_question_list' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetEventsQuery, GetEventsQueryVariables>;
export const DeleteEventDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteEvent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'deleteEventId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteEvent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'deleteEventId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteEventMutation, DeleteEventMutationVariables>;
export const ScanQrCodeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'scanQRCode' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'qrCodeNumber' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'scanQRCode' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'qr_code_number' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'qrCodeNumber' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'qr_code_scanned_time' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ScanQrCodeMutation, ScanQrCodeMutationVariables>;
export const GetEventWithoutAnswersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetEventWithoutAnswers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'getEventWithoutAnswersId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getEventWithoutAnswers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'getEventWithoutAnswersId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'start_time' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'guide_lines' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'seq_id' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'mcq_question_list' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sharable_link' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetEventWithoutAnswersQuery,
  GetEventWithoutAnswersQueryVariables
>;
export const SubmitResultDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'SubmitResult' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'eventId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'eventResult' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'EventResultInput' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'submitResult' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'event_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'eventId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'event_result' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'eventResult' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'event_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'is_passed' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'is_qr_code_scanned' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'qr_code_number' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubmitResultMutation,
  SubmitResultMutationVariables
>;
export const GetEventDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetEvent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'getEventId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getEvent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'getEventId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sharable_link' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'start_time' } },
                { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'guide_lines' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'body' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'correct_answer' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'mcq_question_list' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'label' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'seq_id' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'first_name' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'last_name' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'organization' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetEventQuery, GetEventQueryVariables>;
export const UpdateEventDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateEvent' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'updateEventId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'event' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'EventUpdate' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateEvent' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'updateEventId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'event' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'event' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateEventMutation, UpdateEventMutationVariables>;
