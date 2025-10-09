import { useState } from 'react';
import Link from 'next/link';
import { Flex, Input, Button } from '@awareness/ui';
import { LayoutLogin } from '../../components';

const RegistrationName = () => {
  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    organization: '',
  });

  const handleChangeFirstname = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials({
      ...credentials,
      firstName: event.target.value,
    });
  };

  const handleChangeLastname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      lastName: event.target.value,
    });
  };

  const handleChangeOrganization = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials({
      ...credentials,
      organization: event.target.value,
    });
  };

  return (
    <LayoutLogin>
      <Flex flexDirection="column" alignItems="center" height="250px">
        <Input
          style={{
            marginBottom: '12px',
            width: '288px',
          }}
          label="First Name"
          width="inherit"
          type="text"
          value={credentials.firstName}
          onChange={handleChangeFirstname}
        />
        <Input
          style={{ marginBottom: '10px', width: '288px' }}
          label="Lastname"
          type="text"
          value={credentials.lastName}
          onChange={handleChangeLastname}
          width="inherit"
        />
        <Input
          style={{ marginBottom: '24px', width: '288px' }}
          label="Organization"
          type="password"
          value={credentials.organization}
          onChange={handleChangeOrganization}
          width="inherit"
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
          disabled={
            !credentials.firstName ||
            !credentials.lastName ||
            !credentials.organization
          }
          onClick={() => console.log('clicked')}
        >
          <Link href="/registration-verify">Create an account</Link>
        </Button>
      </Flex>
    </LayoutLogin>
  );
};

export default RegistrationName;
