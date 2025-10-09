import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, Input, Button, Text } from '@awareness/ui';
import {
  useVerifyCodeMutation,
  useResendCodeMutation,
} from '@awareness/graphql';
import { LayoutLogin } from '../../components';

const RegistrationCode = () => {
  const [code, setCode] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();
  const [verificationId, setVerificationId] = useState('');
  const [verifyCodeMutation, { error, reset, loading }] =
    useVerifyCodeMutation();
  const [resendCodeMutation] = useResendCodeMutation();

  const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
    reset();
  };

  const handleVerifyCode = async () => {
    try {
      await verifyCodeMutation({
        variables: {
          verifyCodeId: verificationId,
          code: code,
        },
      });
      router.push('/login');
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleVerifyCode();
    }
  };

  const handleResendCode = async () => {
    try {
      await resendCodeMutation({ variables: { email: userEmail } });
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const email = window?.localStorage?.getItem('email') as string;

    setUserEmail(email);
  }, []);

  useEffect(() => {
    const id = window?.localStorage.getItem('id');
    setVerificationId(id as string);
  }, []);

  return (
    <LayoutLogin>
      <Flex
        flexDirection="column"
        alignItems="center"
        height="250px"
        width="288px"
      >
        <Text mb="15px" fontSize="12px" color="white">
          We have sent a code to the email address {userEmail} . Please enter
          the code below to verify your account.
        </Text>
        <Input
          style={{
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
          style={{
            width: '100%',
            paddingTop: '5px',
            height: '32px',
            borderRadius: '8px',
            marginTop: '10px',
          }}
          width="inherit"
          disabled={!code}
          onClick={handleVerifyCode}
          loading={loading}
        >
          Verify code
        </Button>
        <Button
          variant="tertiary"
          color="black !important"
          style={{
            width: '100%',
            marginTop: '5px',
            height: '32px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: 'white',
            outline: 'none',
          }}
          width="inherit"
          onClick={handleResendCode}
        >
          Resend Reset Password Code
        </Button>
      </Flex>
    </LayoutLogin>
  );
};

export default RegistrationCode;
