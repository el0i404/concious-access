import { useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, Input, Button } from '@awareness/ui';
import { useForgotPasswordMutation } from '@awareness/graphql';
import { LayoutLogin } from '../../components';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [forgotPassword, { error }] = useForgotPasswordMutation({
    onCompleted: (data) => {
      localStorage.setItem('userdata', JSON.stringify(data.forgotPassword));
      router.push('/login-code');
    },
  });

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleForgotPassword = async () => {
    try {
      await forgotPassword({ variables: { email } });
    } catch (error) {
      console.log('errors', error);
    }
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleForgotPassword();
    }
  };

  return (
    <LayoutLogin>
      <Flex
        flexDirection="column"
        alignItems="center"
        height="250px"
        style={{ rowGap: '15px' }}
      >
        <Input
          style={{
            width: '288px',
          }}
          label="Email"
          width="inherit"
          type="email"
          hint="incorrect email. Please try again."
          error={Boolean(error?.message)}
          value={email}
          onChange={handleChangeUsername}
          onKeyDown={handleOnKeyDown}
        />
        <Button
          style={{
            width: '100%',
            paddingTop: '5px',
            height: '32px',
            borderRadius: '8px',
          }}
          width="inherit"
          disabled={!email}
          onClick={handleForgotPassword}
        >
          Send reset password code
        </Button>
      </Flex>
    </LayoutLogin>
  );
};

export default ForgotPassword;
