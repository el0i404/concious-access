import React from 'react';
import { Story, Meta } from '@storybook/react';

import { TextAreaElement } from './contracts';
import TextArea from './text-area';

export default {
  component: TextArea,
  title: 'TextArea',
} as Meta;

const Template: Story<TextAreaElement> = ({ value: newValue, ...rest }) => {
  const [value, setValue] = React.useState(newValue);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return <TextArea value={value} onChange={handleOnChange} {...rest} />;
};

export const Default = Template.bind({});

Default.args = {
  label: 'This is a text-area',
  disabled: false,
  value: 'my text-area',
  error: false,
  cols: null,
  rows: 3,
  hint: 'This is a sample hint message',
  placeholder: 'This is a placeholder',
};
