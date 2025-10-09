import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { ErrorResponse, onError } from '@apollo/client/link/error';

const GraphQL_API_URL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000/graphql'
    : process.env.NEXT_PUBLIC_GRAPHQL_API;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    /**
     * @TODO send error logs to error tracking service. E.g. Sentry
     */
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${path?.toString()}`
      )
    );
  }
  if (networkError) {
    console.warn(`[Network error]: ${JSON.stringify(networkError)}`);
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, new HttpLink({ uri: GraphQL_API_URL })]),
  credentials: 'same-origin',
});

export default client;
