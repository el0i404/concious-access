import React from 'react';
import { Story, Meta } from '@storybook/react';

import { IBox } from '../box/contracts';

import Skeleton from './skeleton';

export default {
  component: Skeleton,
  title: 'Skeleton',
} as Meta;

const Template: Story<IBox> = (args) => <Skeleton {...args} />;

export const Default = Template.bind({});

Default.args = {};
