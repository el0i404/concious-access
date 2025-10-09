import { useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, Input, Button, Text } from '@awareness/ui';
import {
  useVerifyCodeMutation,
  useResendCodeMutation,
} from '@awareness/graphql';

import { LayoutLogin } from '../../components';

const LoginCode = () => {
  const [code, setCode] = useState('');
  const router = useRouter();

  const [verifyCodeMutation, { error, loading, reset }] =
    useVerifyCodeMutation();
  const [resendCodeMutation] = useResendCodeMutation();

  const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
    reset();
  };

  const handleVerifyCode = async () => {
    const { id } =
      JSON.parse(localStorage?.getItem('userdata') as string) || '';

    try {
      await verifyCodeMutation({
        variables: { code, verifyCodeId: id },
      });

      router.push('/reset-password');
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleVerifyCode();
    }
  };

  const handleResendCode = () => {
    const { email: userEmail } =
      JSON.parse(localStorage?.getItem('userdata') as string) || '';

    resendCodeMutation({
      variables: {
        email: userEmail,
      },
    });
  };

  return (
    <LayoutLogin>
      <Flex
        flexDirection="column"
        alignItems="center"
        height="250px"
        width="288px"
      >
        <Text mb="15px" fontSize="12px" color="white">
          If you have an account with us, you should receive a code in your
          inbox. Please enter the code below.
        </Text>
        <Input
          style={{
            marginBottom: '5px',
            width: '288px',
          }}
          label="Code"
          width="inherit"
          placeholder="Code"
          type="email"
          value={code}
          error={Boolean(error?.message)}
          hint={error?.message}
          onChange={handleChangeCode}
          onKeyDown={handleOnKeyDown}
        />
        <Button
          color="black !important"
          loading={loading}
          style={{
            width: '100%',
            marginTop: '15px',
            height: '32px',
            borderRadius: '8px',
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          width="inherit"
          disabled={!code}
          onClick={handleVerifyCode}
        >
          Verify code
        </Button>
        <Button
          variant="quartary"
          style={{
            width: '100%',
            marginTop: '5px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: 'white !important',
          }}
          width="inherit"
          onClick={handleResendCode}
        >
          Resend verification code
        </Button>
      </Flex>
    </LayoutLogin>
  );
};

export default LoginCode;
