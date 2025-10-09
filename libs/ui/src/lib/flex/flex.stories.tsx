import { Meta, Story } from '@storybook/react';

import Box from '../box/box';
import * as BoxStories from '../box/box.stories';

import Flex from './flex';
import { FlexProps } from './flex';

export default {
  component: Flex,
  title: 'Flex',
  argTypes: {},
} as Meta;

const Template: Story<FlexProps> = (args) => <Flex {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: [<Box {...BoxStories.Primary.args} />, <Box {...BoxStories.Primary.args} />],
};
