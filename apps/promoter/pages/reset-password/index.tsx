import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Flex, Input, Button } from '@awareness/ui';
import { useResetPasswordMutation } from '@awareness/graphql';

import { LayoutLogin } from '../../components';

const ResetPassword = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    newPassword: '',
    repeatPassword: '',
  });

  const router = useRouter();

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('userdata') as string);
    setCredentials({ ...credentials, email });
  }, []);

  const [resetPasswordMutation] = useResetPasswordMutation();

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, newPassword: event.target.value });
  };

  const handleRepeatPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, repeatPassword: event.target.value });
  };

  const handleResetPassword = async () => {
    try {
      await resetPasswordMutation({
        variables: {
          email: credentials.email,
          password: credentials.newPassword,
        },
      });

      router.push('/login');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <LayoutLogin>
      <Flex flexDirection="column" alignItems="center" height="250px">
        <Input
          style={{
            marginBottom: '12px',
            width: '288px',
          }}
          label="Password"
          width="inherit"
          type="password"
          value={credentials.newPassword}
          onChange={handleChangePassword}
        />
        <Input
          style={{
            marginBottom: '12px',
            width: '288px',
          }}
          label="Repeat Password"
          width="inherit"
          type="password"
          value={credentials.repeatPassword}
          onChange={handleRepeatPassword}
        />
        <Button
          color="black !important"
          style={{
            width: '100%',
            paddingTop: '5px',
            height: '32px',
            borderRadius: '8px',
          }}
          width="inherit"
          disabled={!credentials.newPassword || !credentials.repeatPassword}
          onClick={handleResetPassword}
        >
          Reset password
        </Button>
      </Flex>
    </LayoutLogin>
  );
};

export default ResetPassword;
