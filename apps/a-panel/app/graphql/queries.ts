import { gql } from '@apollo/client';
// GraphQL query for fetching the user list
export const USER_LIST_QUERY = gql`
  query GetUsers {
    getUsers {
      id
      first_name
      last_name
      organization
      email
      isVerified
      createdAt
      updatedAt
    }
  }
`;
