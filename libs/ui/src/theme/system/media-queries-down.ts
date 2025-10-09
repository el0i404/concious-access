import { breakpoints } from '.';

export const mediaQueriesDown = {
  sm: `@media (max-width: ${breakpoints[0]})`,
  md: `@media (max-width: ${breakpoints[1]})`,
  lg: `@media (max-width: ${breakpoints[2]})`,
  xl: `@media (max-width: ${breakpoints[3]})`,
};
