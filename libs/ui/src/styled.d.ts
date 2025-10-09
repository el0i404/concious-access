import { RebootTheme } from 'styled-reboot';

import {
  ThemeColors,
  ThemeScale,
  ThemeSpaces,
  ThemeFontSizes,
  ThemeFontWeights,
  ThemeBreakpointAlias,
  ThemeMediaQueries,
} from './contracts';

import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends RebootTheme {
    colors: ThemeColors;
    breakpoints: ThemeScale<string, ThemeBreakpointAlias>;
    fontWeights: ThemeFontWeights;
    space: ThemeSpaces;
    fontSizes: ThemeFontSizes;
    mediaQueries: ThemeMediaQueries;
    mediaQueriesDown: ThemeMediaQueries;
  }
}
