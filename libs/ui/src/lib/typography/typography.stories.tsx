import { Meta, Story } from '@storybook/react';

import { fontWeights } from '../../theme/system/font-weights';
import Flex, { FlexProps } from '../flex/flex';

import { ITypography } from './contracts';
import Typography from './typography';

export default {
  component: Typography,
  title: 'Typography',
} as Meta;

const Template: Story<ITypography> = (args) => <Typography {...args} />;

const FlexTemplate: Story<FlexProps> = (args) => <Flex {...args} />;

export const All = FlexTemplate.bind({});

export const Heading1 = Template.bind({});
Heading1.args = {
  children: ['Heading1'],
  variant: 'heading1',
};

export const Heading2 = Template.bind({});
Heading2.args = {
  children: ['Heading 2'],
  variant: 'heading2',
};

export const Heading3 = Template.bind({});
Heading3.args = {
  children: ['Heading 3'],
  variant: 'heading3',
};

export const Heading4 = Template.bind({});
Heading4.args = {
  children: ['Heading 4'],
  variant: 'heading4',
};

export const Body1 = Template.bind({});
Body1.args = {
  children: ['Body 1'],
  variant: 'body1',
  fontWeight: fontWeights.regular,
};

export const Body2 = Template.bind({});
Body2.args = {
  children: ['Body 2'],
  variant: 'body2',
  fontWeight: fontWeights.regular,
};

export const AsASpan = Template.bind({});
AsASpan.args = {
  children: ['As a span'],
  as: 'span',
  variant: 'body2',
};

All.args = {
  flexDirection: 'column',
  children: [
    <Template {...Heading1.args} />,
    <Template {...Heading2.args} />,
    <Template {...Heading3.args} />,
    <Template {...Heading4.args} />,
    <Template {...Body1.args} />,
    <Template {...Body2.args} />,
    <Template {...AsASpan.args} />,
  ],
};
