'use client';
import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Flex, Input, Button } from '@awareness/ui';
import { useAuth } from '@awareness/auth';
import { useLoginMutation } from '@awareness/graphql';

import { LayoutLogin } from '../../components';
import { useRouter } from 'next/router';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const { signInError, setSignInError } = useAuth();
  const [loginMutation, { loading, error }] = useLoginMutation({
    onCompleted: (data) => {
      window.localStorage.setItem('token', data?.login?.data?.token as string);

      router.push('/events');
    },
  });

  useEffect(() => window.localStorage.clear(), []);

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (signInError) {
      setSignInError(false);
    }
    setCredentials({
      ...credentials,
      email: event.target.value,
    });
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (signInError) {
      setSignInError(false);
    }
    setCredentials({
      ...credentials,
      password: event.target.value,
    });
  };

  const handleOnLogin = async () => {
    try {
      await loginMutation({
        variables: {
          email: credentials.email,
          password: credentials.password,
        },
      });
    } catch (error) {
      if (window.navigator.vibrate) {
        return window.navigator.vibrate([200, 100, 200]);
      }
      console.log('error', error);
    }
  };

  const handleLoginKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleOnLogin();
    }

    return null;
  };

  return (
    <LayoutLogin>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        height="270px"
      >
        <Flex
          flexDirection="column"
          height="165px"
          justifyContent="space-around"
          style={{ rowGap: '10px' }}
        >
          <Input
            style={{
              width: '288px',
            }}
            label="Email"
            width="inherit"
            type="email"
            name="email"
            autoComplete="email"
            value={credentials.email}
            onChange={handleChangeUsername}
            onKeyDown={handleLoginKeyDown}
          />
          <Input
            style={{ width: '288px' }}
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChangePassword}
            onKeyDown={handleLoginKeyDown}
            width="inherit"
            hint={error?.message}
            error={Boolean(error?.message)}
          />
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="center"
          mt="35px"
          style={{ rowGap: '20px' }}
        >
          <Button
            color="black !important"
            style={{
              width: '100%',
              paddingTop: '5px',
              height: '32px',
              borderRadius: '8px',
            }}
            loading={loading}
            width="inherit"
            disabled={!credentials.email || !credentials.password}
            onClick={handleOnLogin}
          >
            Log in
          </Button>
          <Link style={{ color: 'white' }} href="/forgot-password">
            Forgot password?
          </Link>
          <Link style={{ color: 'white' }} href="/registration">
            Sign up
          </Link>
        </Flex>
      </Flex>
    </LayoutLogin>
  );
};

export default Login;
