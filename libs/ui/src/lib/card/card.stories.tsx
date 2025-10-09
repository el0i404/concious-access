import { Story, Meta } from '@storybook/react';

import Card, { ICard } from './card';

export default {
  component: Card,
  title: 'Card',
} as Meta;

const Template: Story<ICard> = (args) => <Card {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: <span>Card Content</span>,
  width: '286px',
  height: '245px',
  p: '16px',
};
