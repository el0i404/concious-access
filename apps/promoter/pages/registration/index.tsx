import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutLogin } from '../../components';

import { useRegisterMutation } from '@awareness/graphql';
import { Flex, Input, Text, Button } from '@awareness/ui';

const Registration = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    organization: '',
  });
  const [samePassword, setSamePassword] = useState(false);

  const router = useRouter();
  const [registerMutation, { loading, error }] = useRegisterMutation({
    onCompleted: (data) => {
      window.localStorage.setItem('id', data?.register.data.id);
    },
  });

  const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleOnClick = async (e: {
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      await registerMutation({
        variables: {
          email: credentials.email,
          password: credentials.password,
          organization: credentials.organization,
        },
      });

      window.localStorage.setItem('email', credentials.email);

      router.push('/registration-code');
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (credentials.password === credentials.repeatPassword) {
      setSamePassword(true);
    } else {
      setSamePassword(false);
    }
  }, [credentials.repeatPassword, credentials.password]);

  return (
    <LayoutLogin>
      <Flex flexDirection="column" alignItems="center" height="460px">
        <Flex
          flexDirection="column"
          alignItems="center"
          style={{ rowGap: '10px !important' }}
        >
          <Input
            style={{
              width: '288px',
            }}
            label="Email"
            name="email"
            autoComplete="email"
            width="inherit"
            type="email"
            error={Boolean(error?.message)}
            hint={error?.message}
            value={credentials.email}
            onChange={handleChangeCredentials}
          />
          <Input
            style={{
              width: '288px',
            }}
            label="Organization"
            name="organization"
            autoComplete="organization"
            width="inherit"
            type="text"
            value={credentials.organization}
            onChange={handleChangeCredentials}
          />
          <Input
            style={{ width: '288px' }}
            label="Create Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChangeCredentials}
            width="inherit"
          />
          <Input
            style={{ width: '288px' }}
            label="Repeat Password"
            name="repeatPassword"
            type="password"
            value={credentials.repeatPassword}
            onChange={handleChangeCredentials}
            width="inherit"
            error={!samePassword}
            hint="password does not match, try again"
          />
        </Flex>
        <Button
          color="black !important"
          loading={loading}
          style={{
            width: '100%',
            paddingTop: '5px',
            marginTop: '35px',
            height: '32px',
            borderRadius: '8px',
          }}
          width="inherit"
          disabled={
            !samePassword ||
            !credentials.email ||
            !credentials.organization ||
            !credentials.password ||
            !credentials.repeatPassword
          }
          onClick={handleOnClick}
        >
          Sign Up
        </Button>
        <Text color="white" mt="12px">
          Already have an account? Log in <Link href="/login">Here</Link>
        </Text>
      </Flex>
    </LayoutLogin>
  );
};

export default Registration;
