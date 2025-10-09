import { Story, Meta } from '@storybook/react';

import Box from '../box/box';
import Text from '../text/text';

import Grid from './grid';
import { GridProps } from './grid';

export default {
  component: Grid,
  title: 'Grid',
} as Meta;

const Template: Story<GridProps> = (args) => <Grid {...args} />;

const children = Array.from(
  {
    length: 20,
  },
  (v, i) => (
    <Box key={i} border="1px solid #ccc" p={2}>
      <Text>Text {i}</Text>
    </Box>
  ),
);

export const Primary = Template.bind({});
Primary.args = {
  children,
  gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(4, 1fr)', 'repeat(6, 1fr)', 'repeat(8, 1fr)'],
  gridColumnGap: 12,
  gridRowGap: 12,
};
