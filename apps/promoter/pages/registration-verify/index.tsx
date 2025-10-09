'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Flex, Input, Text, Button } from '@awareness/ui';
import { LayoutLogin } from '../../components';

const RegistrationVerify = () => {
  const [recoveryCode, setRecoveryCode] = useState('');

  const handleChangeRecoveryCode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRecoveryCode(event.target.value);
  };

  return (
    <LayoutLogin>
      <Flex
        flexDirection="column"
        alignItems="center"
        height="250px"
        width="288px"
      >
        <Text color="white" mb="12px">
          We have sent a code to the email address newemail@user.com. Please
          enter the code below to verify your account.
        </Text>
        <Input
          style={{
            marginBottom: '12px',
            width: '288px',
          }}
          label="Code"
          width="inherit"
          placeholder="Code"
          type="email"
          value={recoveryCode}
          onChange={handleChangeRecoveryCode}
        />
        <Button
          color="black !important"
          style={{
            width: '288px',
            paddingTop: '5px',
            height: '32px',
            borderRadius: '8px',
          }}
          width="inherit"
          disabled={!recoveryCode}
          onClick={() => console.log('clicked')}
        >
          <Link href="/registration-name">Verify code</Link>
        </Button>
        <Button
          variant="tertiary"
          style={{
            marginTop: '12px',
            width: '288px',
            paddingTop: '5px',
            height: '32px',
            borderRadius: '8px',
          }}
          onClick={() => console.log('clicked')}
        >
          Resend verification code
        </Button>
      </Flex>
    </LayoutLogin>
  );
};

export default RegistrationVerify;
