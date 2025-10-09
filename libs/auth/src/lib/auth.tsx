// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
  from,
} from '@apollo/client';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useMemo, useState } from 'react';

import { ErrorResponse, onError } from '@apollo/client/link/error';

interface SignInResponse {
  status: boolean;
  error: unknown;
}

interface IAuthContext {
  signIn: ({ email, password }: { email: string; password: string }) => void;
  setAuthToken: (token: string) => void;
  isSignedIn: () => boolean;
  signOut: () => void;
  createApolloClient: ApolloClient<NormalizedCacheObject>;
  signInError: string;
  setSignInError: (el: string | boolean) => void;
}

const authContext = createContext<IAuthContext>({
  signIn: function ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): void {
    throw new Error('Function not implemented.');
  },
  setAuthToken: function (token: string): void {
    throw new Error('Function not implemented.');
  },
  isSignedIn: function (): boolean {
    throw new Error('Function not implemented.');
  },
  signOut: function (): void {
    throw new Error('Function not implemented.');
  },
  createApolloClient: undefined,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.apolloClient}>{children}</ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [loginResults, setLoginResults] = useState('');
  const [authToken, setAuthToken] = useState(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('token') || null;
      return token;
    }
    return null;
  });
  const [signInError, setSignInError] = useState<string | boolean>('');
  const router = useRouter();

  const apolloClient = useMemo(() => {
    const errorLink = onError(
      ({ graphQLErrors, networkError, operation, forward }: ErrorResponse) => {
        console.log({
          graphQLErrors,
          networkError,
        });

        if (graphQLErrors) {
          for (const err of graphQLErrors) {
            switch (err.extensions.code) {
              case '401':
                router.replace('/login');
                return;
            }
            if (err.message === 'Invalid or expired token') {
              router.replace('/login');
            }
          }
        }

        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }
    );

    const authLink = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers }) => {
        const token = localStorage.getItem('token');

        return {
          headers: {
            authorization: token ? `Bearer ${token}` : '', // however you get your token
            ...headers,
          },
        };
      });
      return forward(operation);
    });

    const uri = 'https://sq1p1q3n1e.execute-api.us-east-1.amazonaws.com';
    // process.env.NODE_ENV === 'production'
    //   ? process.env.NEXT_PUBLIC_GRAPHQL_API
    //   : process.env.NEXT_PUBLIC_LOCALHOST;

    const httpLink = createHttpLink({
      uri,
    });

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: from([errorLink, authLink, httpLink]),
    });
  }, [router]);

  const isSignedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  const signOut = (): void => {
    setAuthToken(null);
    window.localStorage.removeItem('token');
  };

  return {
    loginResults,
    setLoginResults,
    signInError,
    setSignInError,
    setAuthToken,
    isSignedIn,
    signOut,
    apolloClient,
  };
}
