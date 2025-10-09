import styled, { css } from 'styled-components';

import { InputElement, InputError } from '../contracts';

export const InputErrorStyle = ({ error }: InputError) =>
  error &&
  css`
    border-color: ${({
      theme: {
        colors: { danger100 },
      },
    }) => danger100};
    /* background-color: ${({
      theme: {
        colors: { danger5 },
      },
    }) => danger5}; */

    &:hover {
      border-color: ${({
        theme: {
          colors: { danger100 },
        },
      }) => danger100};

      &:focus {
        border-color: ${({
          theme: {
            colors: { danger100 },
          },
        }) => danger100};
      }
    }
  `;

export const CommonInputStyle = css`
  &:active {
    border-color: ${({
      theme: {
        colors: { primary100 },
      },
    }) => primary100};
  }
  /*
  &:focus:hover {
    border-color: ${({
    theme: {
      colors: { primary100 },
    },
  }) => primary100};
  } */

  &:disabled,
  &:disabled:focus,
  &:disabled:active,
  &:disabled:hover {
    background-color: ${({
      theme: {
        colors: { white100 },
      },
    }) => white100};
    border-color: ${({
      theme: {
        colors: { secondary20 },
      },
    }) => secondary20};
    color: ${({
      theme: {
        colors: { text50 },
      },
    }) => text50};
  }
`;

const InputStyled = styled.input<InputElement>`
  outline: none;
  border-radius: 8px;
  border: ${({
    theme: {
      colors: { secondary20 },
    },
  }) => `1px solid ${secondary20}`};
  padding: ${({ theme: { space } }) => `${space[3]} ${space[5]}`};
  color: #fff;
  background-color: var(--brand-grey, #3c3c3c);
  width: 100%;

  &::placeholder {
    color: #fff;
    font-size: 14px;
  }

  /** Clears the default close icon from the search input */
  &::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }
  &::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }

  &:focus {
    border-color: #e37a58;
  }

  /* &:hover {
    border-color: ${({
      theme: {
        colors: { secondary100 },
      },
    }) => secondary100}; */

    /** Clears the default close icon from the search input */
    &::-ms-clear {
      display: none;
      width: 0;
      height: 0;
    }
    &::-ms-reveal {
      display: none;
      width: 0;
      height: 0;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      display: none;
    }
  }
  ${CommonInputStyle}
  ${InputErrorStyle}
`;

export { InputStyled };
