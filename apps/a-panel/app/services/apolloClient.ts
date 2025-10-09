import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  concat,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Replace 'YOUR_GRAPHQL_ENDPOINT' with your actual GraphQL API URL.
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // Assuming you handle authentication and token management.
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpAuthLink = concat(authLink, httpLink);

const client = new ApolloClient({
  link: httpAuthLink,
  cache: new InMemoryCache(),
});

export default client;
