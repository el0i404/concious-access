import { DefaultTheme } from 'styled-components';
import { defaultRebootTheme } from 'styled-reboot';

import {
  breakpoints,
  colors,
  fontSizes,
  fontWeights,
  mediaQueries,
  mediaQueriesDown,
  space,
} from './system';

export const baseTheme: DefaultTheme = {
  ...defaultRebootTheme,
  linkHoverDecoration: 'none',
  fontFamilyBase: "'noto-sans', sans-serif",
  breakpoints,
  colors,
  fontSizes,
  fontWeights,
  mediaQueries,
  mediaQueriesDown,
  space,
};
