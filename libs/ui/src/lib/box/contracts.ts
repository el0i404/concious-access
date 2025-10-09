import { ElementType, ReactNode } from 'react';
import {
  BackgroundProps,
  BorderProps,
  ColorProps,
  FlexboxProps,
  GridProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  TypographyProps,
  BackgroundColorProps,
  DisplayProps,
} from 'styled-system';

interface IBox
  extends SpaceProps,
    FlexboxProps,
    LayoutProps,
    GridProps,
    BorderProps,
    ColorProps,
    PositionProps,
    BackgroundProps,
    ShadowProps,
    BackgroundColorProps,
    DisplayProps,
    TypographyProps {
  children?: ReactNode;
  as?: ElementType;
  row?: boolean;
}

export type { IBox };
