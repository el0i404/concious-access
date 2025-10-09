import { Story, Meta } from '@storybook/react';

import Box from './box';
import { IBox } from './contracts';

export default {
  component: Box,
  title: 'Box',
} as Meta;

const Template: Story<IBox> = (args) => <Box {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: <span>Pretty Column</span>,
  p: 3,
  m: 3,
  color: 'text70',
  borderColor: 'primary100',
  borderWidth: 1,
  borderStyle: 'solid',
  bg: 'info5',
};
