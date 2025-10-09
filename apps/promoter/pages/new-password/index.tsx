import { useState } from 'react';
import { Flex, Input, Button } from '@awareness/ui';
import { LayoutLogin } from '../../components';

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState({
    newPassword: '',
    repeatPassword: '',
  });

  const handleChangeNewPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword({
      ...newPassword,
      newPassword: event.target.value,
    });
  };

  const handleChangeRepeatPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword({
      ...newPassword,
      repeatPassword: event.target.value,
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
        <Input
          style={{
            marginBottom: '20px',
            width: '288px',
          }}
          label="New password"
          width="inherit"
          type="password"
          name="password"
          autoComplete="new-password"
          value={newPassword.newPassword}
          onChange={handleChangeNewPassword}
        />
        <Input
          style={{
            marginBottom: '20px',
            width: '288px',
          }}
          label="Repeat password"
          width="inherit"
          type="password"
          name="password"
          autoComplete="new-password"
          value={newPassword.repeatPassword}
          onChange={handleChangeRepeatPassword}
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
          disabled={!newPassword.newPassword || !newPassword.repeatPassword}
          onClick={() => console.log('clicked')}
        >
          Reset Password
        </Button>
      </Flex>
    </LayoutLogin>
  );
};

export default NewPassword;
