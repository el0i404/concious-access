import { ColorProps, SpaceProps, TypographyProps } from 'styled-system';

/* eslint-disable-next-line */
export interface TextProps extends TypographyProps, ColorProps, SpaceProps {
  as?: React.ElementType;
  children?: React.ReactNode;
}
