import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
const defaultOptions = {} as const;
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

export const RegisterDocument = gql`
  mutation Register(
    $email: String!
    $password: String!
    $organization: String!
  ) {
    register(email: $email, password: $password, organization: $organization) {
      data {
        id
      }
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      organization: // value for 'organization'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      data {
        isVerified
        email
        role
        token
      }
      message
      status
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const CreateEventDocument = gql`
  mutation CreateEvent($event: [EventInput]!) {
    createEvent(event: $event) {
      data {
        guide_lines {
          seq_id
          id
          title
          type
        }
      }
    }
  }
`;
export type CreateEventMutationFn = Apollo.MutationFunction<
  CreateEventMutation,
  CreateEventMutationVariables
>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useCreateEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateEventMutation,
    CreateEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(
    CreateEventDocument,
    options
  );
}
export type CreateEventMutationHookResult = ReturnType<
  typeof useCreateEventMutation
>;
export type CreateEventMutationResult =
  Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<
  CreateEventMutation,
  CreateEventMutationVariables
>;
export const ForgotPasswordDocument = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      email
      id
      success
    }
  }
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult =
  Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const ResendCodeDocument = gql`
  mutation ResendCode($email: String!) {
    resendCode(email: $email) {
      success
    }
  }
`;
export type ResendCodeMutationFn = Apollo.MutationFunction<
  ResendCodeMutation,
  ResendCodeMutationVariables
>;

/**
 * __useResendCodeMutation__
 *
 * To run a mutation, you first call `useResendCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendCodeMutation, { data, loading, error }] = useResendCodeMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useResendCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResendCodeMutation,
    ResendCodeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ResendCodeMutation, ResendCodeMutationVariables>(
    ResendCodeDocument,
    options
  );
}
export type ResendCodeMutationHookResult = ReturnType<
  typeof useResendCodeMutation
>;
export type ResendCodeMutationResult =
  Apollo.MutationResult<ResendCodeMutation>;
export type ResendCodeMutationOptions = Apollo.BaseMutationOptions<
  ResendCodeMutation,
  ResendCodeMutationVariables
>;
export const VerifyCodeDocument = gql`
  mutation VerifyCode($verifyCodeId: ID!, $code: String!) {
    verifyCode(id: $verifyCodeId, code: $code) {
      message
      success
    }
  }
`;
export type VerifyCodeMutationFn = Apollo.MutationFunction<
  VerifyCodeMutation,
  VerifyCodeMutationVariables
>;

/**
 * __useVerifyCodeMutation__
 *
 * To run a mutation, you first call `useVerifyCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyCodeMutation, { data, loading, error }] = useVerifyCodeMutation({
 *   variables: {
 *      verifyCodeId: // value for 'verifyCodeId'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useVerifyCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VerifyCodeMutation,
    VerifyCodeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<VerifyCodeMutation, VerifyCodeMutationVariables>(
    VerifyCodeDocument,
    options
  );
}
export type VerifyCodeMutationHookResult = ReturnType<
  typeof useVerifyCodeMutation
>;
export type VerifyCodeMutationResult =
  Apollo.MutationResult<VerifyCodeMutation>;
export type VerifyCodeMutationOptions = Apollo.BaseMutationOptions<
  VerifyCodeMutation,
  VerifyCodeMutationVariables
>;
export const ResetPasswordDocument = gql`
  mutation ResetPassword($email: String!, $password: String!) {
    resetPassword(email: $email, password: $password) {
      message
      success
    }
  }
`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(ResetPasswordDocument, options);
}
export type ResetPasswordMutationHookResult = ReturnType<
  typeof useResetPasswordMutation
>;
export type ResetPasswordMutationResult =
  Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const GetEventsDocument = gql`
  query GetEvents {
    getEvents {
      id
      name
      location
      date
      sharable_link
      start_time
      guide_lines {
        seq_id
        type
        title
        body
        correct_answer
        mcq_question_list {
          value
          label
        }
      }
    }
  }
`;

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(
    GetEventsDocument,
    options
  );
}
export function useGetEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEventsQuery,
    GetEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(
    GetEventsDocument,
    options
  );
}
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<
  typeof useGetEventsLazyQuery
>;
export type GetEventsQueryResult = Apollo.QueryResult<
  GetEventsQuery,
  GetEventsQueryVariables
>;
export const DeleteEventDocument = gql`
  mutation DeleteEvent($deleteEventId: ID!) {
    deleteEvent(id: $deleteEventId) {
      status
      message
    }
  }
`;
export type DeleteEventMutationFn = Apollo.MutationFunction<
  DeleteEventMutation,
  DeleteEventMutationVariables
>;

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      deleteEventId: // value for 'deleteEventId'
 *   },
 * });
 */
export function useDeleteEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteEventMutation,
    DeleteEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(
    DeleteEventDocument,
    options
  );
}
export type DeleteEventMutationHookResult = ReturnType<
  typeof useDeleteEventMutation
>;
export type DeleteEventMutationResult =
  Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<
  DeleteEventMutation,
  DeleteEventMutationVariables
>;
export const ScanQrCodeDocument = gql`
  mutation scanQRCode($qrCodeNumber: String) {
    scanQRCode(qr_code_number: $qrCodeNumber) {
      qr_code_scanned_time
      success
      message
    }
  }
`;
export type ScanQrCodeMutationFn = Apollo.MutationFunction<
  ScanQrCodeMutation,
  ScanQrCodeMutationVariables
>;

/**
 * __useScanQrCodeMutation__
 *
 * To run a mutation, you first call `useScanQrCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useScanQrCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [scanQrCodeMutation, { data, loading, error }] = useScanQrCodeMutation({
 *   variables: {
 *      qrCodeNumber: // value for 'qrCodeNumber'
 *   },
 * });
 */
export function useScanQrCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ScanQrCodeMutation,
    ScanQrCodeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ScanQrCodeMutation, ScanQrCodeMutationVariables>(
    ScanQrCodeDocument,
    options
  );
}
export type ScanQrCodeMutationHookResult = ReturnType<
  typeof useScanQrCodeMutation
>;
export type ScanQrCodeMutationResult =
  Apollo.MutationResult<ScanQrCodeMutation>;
export type ScanQrCodeMutationOptions = Apollo.BaseMutationOptions<
  ScanQrCodeMutation,
  ScanQrCodeMutationVariables
>;
export const GetEventWithoutAnswersDocument = gql`
  query GetEventWithoutAnswers($getEventWithoutAnswersId: ID!) {
    getEventWithoutAnswers(id: $getEventWithoutAnswersId) {
      id
      name
      location
      date
      start_time
      guide_lines {
        id
        seq_id
        type
        title
        body
        mcq_question_list {
          value
          label
        }
      }
      sharable_link
    }
  }
`;

/**
 * __useGetEventWithoutAnswersQuery__
 *
 * To run a query within a React component, call `useGetEventWithoutAnswersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventWithoutAnswersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventWithoutAnswersQuery({
 *   variables: {
 *      getEventWithoutAnswersId: // value for 'getEventWithoutAnswersId'
 *   },
 * });
 */
export function useGetEventWithoutAnswersQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetEventWithoutAnswersQuery,
    GetEventWithoutAnswersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetEventWithoutAnswersQuery,
    GetEventWithoutAnswersQueryVariables
  >(GetEventWithoutAnswersDocument, options);
}
export function useGetEventWithoutAnswersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEventWithoutAnswersQuery,
    GetEventWithoutAnswersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetEventWithoutAnswersQuery,
    GetEventWithoutAnswersQueryVariables
  >(GetEventWithoutAnswersDocument, options);
}
export type GetEventWithoutAnswersQueryHookResult = ReturnType<
  typeof useGetEventWithoutAnswersQuery
>;
export type GetEventWithoutAnswersLazyQueryHookResult = ReturnType<
  typeof useGetEventWithoutAnswersLazyQuery
>;
export type GetEventWithoutAnswersQueryResult = Apollo.QueryResult<
  GetEventWithoutAnswersQuery,
  GetEventWithoutAnswersQueryVariables
>;
export const SubmitResultDocument = gql`
  mutation SubmitResult($eventId: ID!, $eventResult: [EventResultInput!]!) {
    submitResult(event_id: $eventId, event_result: $eventResult) {
      event_id
      is_passed
      is_qr_code_scanned
      qr_code_number
      createdAt
    }
  }
`;
export type SubmitResultMutationFn = Apollo.MutationFunction<
  SubmitResultMutation,
  SubmitResultMutationVariables
>;

/**
 * __useSubmitResultMutation__
 *
 * To run a mutation, you first call `useSubmitResultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitResultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitResultMutation, { data, loading, error }] = useSubmitResultMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      eventResult: // value for 'eventResult'
 *   },
 * });
 */
export function useSubmitResultMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubmitResultMutation,
    SubmitResultMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SubmitResultMutation,
    SubmitResultMutationVariables
  >(SubmitResultDocument, options);
}
export type SubmitResultMutationHookResult = ReturnType<
  typeof useSubmitResultMutation
>;
export type SubmitResultMutationResult =
  Apollo.MutationResult<SubmitResultMutation>;
export type SubmitResultMutationOptions = Apollo.BaseMutationOptions<
  SubmitResultMutation,
  SubmitResultMutationVariables
>;
export const GetEventDocument = gql`
  query GetEvent($getEventId: ID!) {
    getEvent(id: $getEventId) {
      id
      name
      sharable_link
      start_time
      location
      guide_lines {
        body
        correct_answer
        id
        mcq_question_list {
          label
          value
        }
        seq_id
        title
        type
      }
      date
      user {
        email
        first_name
        id
        last_name
        organization
      }
    }
  }
`;

/**
 * __useGetEventQuery__
 *
 * To run a query within a React component, call `useGetEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventQuery({
 *   variables: {
 *      getEventId: // value for 'getEventId'
 *   },
 * });
 */
export function useGetEventQuery(
  baseOptions: Apollo.QueryHookOptions<GetEventQuery, GetEventQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetEventQuery, GetEventQueryVariables>(
    GetEventDocument,
    options
  );
}
export function useGetEventLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEventQuery,
    GetEventQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetEventQuery, GetEventQueryVariables>(
    GetEventDocument,
    options
  );
}
export type GetEventQueryHookResult = ReturnType<typeof useGetEventQuery>;
export type GetEventLazyQueryHookResult = ReturnType<
  typeof useGetEventLazyQuery
>;
export type GetEventQueryResult = Apollo.QueryResult<
  GetEventQuery,
  GetEventQueryVariables
>;
export const UpdateEventDocument = gql`
  mutation UpdateEvent($updateEventId: ID!, $event: EventUpdate!) {
    updateEvent(id: $updateEventId, event: $event) {
      message
      status
    }
  }
`;
export type UpdateEventMutationFn = Apollo.MutationFunction<
  UpdateEventMutation,
  UpdateEventMutationVariables
>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      updateEventId: // value for 'updateEventId'
 *      event: // value for 'event'
 *   },
 * });
 */
export function useUpdateEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateEventMutation,
    UpdateEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(
    UpdateEventDocument,
    options
  );
}
export type UpdateEventMutationHookResult = ReturnType<
  typeof useUpdateEventMutation
>;
export type UpdateEventMutationResult =
  Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<
  UpdateEventMutation,
  UpdateEventMutationVariables
>;
