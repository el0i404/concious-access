import { Story, Meta } from '@storybook/react';
import { ChevronLeft, ChevronRight } from '@factorypal-fe/shared/icons';

import { space } from '../../theme/system/space';

import Button from './button';
import { IButton } from './contracts';

export default {
  component: Button,
  title: 'Button',
  argTypes: {
    size: {
      options: ['large', 'small'],
      control: { type: 'radio' },
    },
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const Template: Story<IButton> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  disabled: false,
  loading: false,
  submit: false,
  outlined: false,
  variant: 'primary',
  size: 'large',
  children: 'Hola',
  tabIndex: 0,
  expanded: false,
};

export const Secondary = Template.bind({});

Secondary.args = {
  disabled: false,
  loading: false,
  submit: false,
  outlined: false,
  variant: 'secondary',
  size: 'large',
  children: 'Hola',
  tabIndex: 0,
  expanded: false,
};

export const Tertiary = Template.bind({});

Tertiary.args = {
  disabled: false,
  loading: false,
  submit: false,
  outlined: false,
  variant: 'tertiary',
  size: 'large',
  children: 'Hola',
  tabIndex: 0,
  expanded: false,
};

export const LabelAndIconRight = Template.bind({});

LabelAndIconRight.args = {
  disabled: false,
  loading: false,
  submit: false,
  outlined: false,
  variant: 'primary',
  size: 'large',
  children: ['Hola', <ChevronRight width={space[4]} height={space[4]} fill={null} />],
  tabIndex: 0,
  expanded: false,
};

export const LabelAndIconLeft = Template.bind({});

LabelAndIconLeft.args = {
  disabled: false,
  loading: false,
  submit: false,
  outlined: false,
  variant: 'primary',
  size: 'large',
  children: [<ChevronLeft width={space[4]} height={space[4]} fill={null} />, 'Hola'],
  tabIndex: 0,
  expanded: false,
};
