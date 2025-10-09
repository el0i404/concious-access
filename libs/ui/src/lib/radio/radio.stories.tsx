import React from 'react';
import { Story, Meta } from '@storybook/react';

import Radio from './radio';
import { IRadio } from './contracts';

export default {
  component: Radio,
  title: 'Radio',
} as Meta;

const Template: Story<IRadio> = ({ checked: localChecked, ...rest }) => {
  const [checked, setChecked] = React.useState(localChecked);

  const handleOnChange = () => {
    setChecked(!checked);
  };

  return <Radio onChange={handleOnChange} checked={checked} {...rest} />;
};

export const Primary = Template.bind({});

Primary.args = {
  label: 'Radio Button',
  value: 'radio-1',
  checked: false,
  disabled: false,
};
