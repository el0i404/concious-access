'use client';

import { ApolloLink, HttpLink, concat } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

function makeClient() {
  const httpLink = new HttpLink({
    // uri: 'http://localhost:3000/graphql',
    uri: 'https://sq1p1q3n1e.execute-api.us-east-1.amazonaws.com',
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

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpAuthLink,
          ])
        : httpAuthLink,
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
