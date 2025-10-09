import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      message
      data {
        id
        token
        first_name
        last_name
        organization
        email
        isVerified
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logout {
      success
      message
    }
  }
`;

// GraphQL mutation for adding a new user
export const ADD_USER_MUTATION = gql`
  mutation AddUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      organization
      isVerified
      createdAt
      updatedAt
      first_name
      last_name
      email
    }
  }
`;

// GraphQL mutation for editing a user
export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($updateUserId: ID!, $input: UpdateUserInput!) {
    updateUser(id: $updateUserId, input: $input) {
      id
      organization
      isVerified
      createdAt
      updatedAt
      first_name
      last_name
      email
    }
  }
`;

// GraphQL mutation for deleting the user
export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
