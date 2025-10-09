import React from 'react';
import {
  ColorProps,
  LayoutProps,
  SpaceProps,
  TypographyProps,
  PositionProps,
  BordersProps,
  TextShadowProps,
} from 'styled-system';

import { ThemeFontWeightsAlias } from '../../contracts';

export interface TypographyVariantStyle extends Partial<SpaceProps> {
  fontStyle: string;
  fontWeight: ThemeFontWeightsAlias;
  fontSize: string | number;
  lineHeight: string;
}

export const variantMapping: Record<TypographyVariant, string> = {
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  subheading1: 'span',
  subheading2: 'span',
  subheading3: 'span',
  body1: 'p',
  body2: 'p',
};

export type HeadingVariant = 'heading1' | 'heading2' | 'heading3' | 'heading4';

export type SubheadingVariant = 'subheading1' | 'subheading2' | 'subheading3';

export type BodyVariant = 'body1' | 'body2';

export type TypographyVariant = HeadingVariant | SubheadingVariant | BodyVariant;

export type ITypography = {
  variant?: TypographyVariant;
  as?: React.ElementType;
  children?: React.ReactNode;
  typographyRef?: React.MutableRefObject<unknown>;
  showNotification?: boolean;
  hideNotification?: boolean;
  textTransform?: string;
  testId?: string;
} & TypographyProps &
  ColorProps &
  SpaceProps &
  LayoutProps &
  PositionProps &
  BordersProps &
  TextShadowProps;

export type showHideNotification = {
  hideNotification: boolean;
  showNotification: boolean;
};
