export type ThemeScale<Type, Aliases extends string> = Array<Type> & Record<Aliases, Type>;

export interface ThemeColors {
  contentBackgroundColor: string;
  danger10: string;
  danger100: string;
  danger20: string;
  danger200: string;
  danger5: string;
  danger50: string;
  danger70: string;
  done100: string;
  done200: string;
  error10: string;
  error200: string;
  info10: string;
  info100: string;
  info20: string;
  info200: string;
  info30: string;
  info5: string;
  info50: string;
  info70: string;
  primary10: string;
  primary100: string;
  primary20: string;
  primary5: string;
  primary50: string;
  refine10: string;
  refine200: string;
  secondary10: string;
  secondary100: string;
  secondary20: string;
  secondary5: string;
  secondary50: string;
  secondary60: string;
  secondary80: string;
  success10: string;
  success100: string;
  success20: string;
  success200: string;
  success5: string;
  success50: string;
  success70: string;
  text0: string;
  text100: string;
  text20: string;
  text50: string;
  text70: string;
  transparent: string;
  warning10: string;
  warning15: string;
  warning100: string;
  warning20: string;
  warning200: string;
  warning30: string;
  warning5: string;
  warning50: string;
  warning70: string;
  warning90: string;
  white100: string;
}

export type ThemeBreakpointAlias = 'sm' | 'md' | 'lg' | 'xl';

export type ThemeFontWeightsAlias =
  | 'thin'
  | 'extra-light'
  | 'light'
  | 'regular'
  | 'medium'
  | 'semi-bold'
  | 'bold'
  | 'extra-bold'
  | 'ultra-bold';

export interface ThemeFontWeights {
  thin: number;
  'extra-light': number;
  light: number;
  regular: number;
  medium: number;
  'semi-bold': number;
  bold: number;
  'extra-bold': number;
  'ultra-bold': number;
}

export type ThemeSpaces = number[] | string[];
export type ThemeFontSizes = number[] | string[];

export interface ThemeMediaQueries {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}
