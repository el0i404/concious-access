import styled, { keyframes, css } from 'styled-components';
import { color, compose, space, typography, variant } from 'styled-system';

import { TypographyVariantStyle, showHideNotification } from '../contracts';

const slideInRight = keyframes`
  0% {
    transform: translateX(100px);
    opacity: 0;
    width: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
    width: auto;
  }
`;

const slideOutRight = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
    width: auto;
  }

  25% {
    opacity: 0.75;
  }

  50% {
    opacity: 0.5;
  }

  75% {
    opacity: 0.25;
  }

  100% {
    transform: translateX(100px);
    opacity: 0;
    width: 0;
  }
`;

const StyledTypography = styled.span<showHideNotification & { textTransform: string }>`
  animation: ${({ showNotification, hideNotification }) =>
    showNotification &&
    css`
      ${slideInRight} 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both
    ` &&
    hideNotification
      ? css`
          ${slideOutRight} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both
        `
      : null};
  text-transform: ${({ textTransform }) => textTransform};
  ${compose(
    typography,
    space,
    color,
    variant<TypographyVariantStyle>({
      variants: {
        heading1: {
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '2.25rem',
          lineHeight: '3rem',
        },
        heading2: {
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '1.75rem',
          lineHeight: '2.25rem',
        },
        heading3: {
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          lineHeight: '1.875rem',
        },
        heading4: {
          fontStyle: 'normal',
          fontWeight: 'semi-bold',
          fontSize: '1.25rem',
          lineHeight: '1.5rem',
        },
        subheading1: {
          fontStyle: 'normal',
          fontWeight: 'regular',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
        },
        subheading2: {
          fontStyle: 'normal',
          fontWeight: 'semi-bold',
          fontSize: '1rem',
          lineHeight: '1.25rem',
        },
        subheading3: {
          fontStyle: 'normal',
          fontWeight: 'regular',
          fontSize: '0.6875rem',
          lineHeight: '0.75rem',
        },
        body1: {
          fontStyle: 'normal',
          fontWeight: 'regular',
          fontSize: '1rem',
          lineHeight: '1.375rem',
          marginBottom: '0',
        },
        body2: {
          fontStyle: 'normal',
          fontWeight: 'regular',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          marginBottom: '0',
        },
        span: {
          fontStyle: 'normal',
          fontWeight: 'regular',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
        },
      },
    }),
  )};
`;

export default StyledTypography;
