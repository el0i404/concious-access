import styled, { css } from 'styled-components';
import { layout, space, flexbox } from 'styled-system';

import { IButton } from '../contracts';

const variants = ({ variant, outlined }: IButton) => {
  switch (variant) {
    case 'primary': {
      return css`
        color: ${({
          theme: {
            colors: { black100 },
          },
        }) => black100};
        fill: ${({
          theme: {
            colors: { white100 },
          },
        }) => white100};
        /* background-color: ${({
          theme: {
            colors: { text0 },
          },
        }) => text0}; */

        ${outlined &&
        css`
          border-color: ${({
            theme: {
              colors: { primary50 },
            },
          }) => primary50};
        `}

        /* &:focus {
          background-color: ${({
          theme: {
            colors: { info100 },
          },
        }) => info100};
        } */

        &:disabled,
        &:disabled:focus,
        &:disabled:active,
        &:disabled:hover {
          /* background-color: ${({
            theme: {
              colors: { secondary50 },
            },
          }) => secondary50}; */
          color: 'black';
          fill: ${({
            theme: {
              colors: { white100 },
            },
          }) => white100};
        }

        &:active:not([disabled]) {
          outline: ${({ theme: { colors } }) => `2px solid ${colors.info200}`};
          outline-offset: 2px;
          /* background-color: ${({
            theme: {
              colors: { primary100 },
            },
          }) => primary100}; */
        }

        /* &:hover {
          background-color: ${({
          theme: {
            colors: { info200 },
          },
        }) => info200};
        } */
      `;
    }
    case 'secondary': {
      return css`
        color: ${({
          theme: {
            colors: { primary100 },
          },
        }) => primary100};
        fill: ${({
          theme: {
            colors: { primary100 },
          },
        }) => primary100};
        background-color: ${({
          theme: {
            colors: { transparent },
          },
        }) => transparent};
        border: ${({
          theme: {
            colors: { primary100 },
          },
        }) => `1px solid ${primary100}`};

        ${
          outlined &&
          css`
            border: ${({
              theme: {
                colors: { primary100 },
              },
            }) => `2px solid ${primary100}`};
            background-color: ${({
              theme: {
                colors: { primary5 },
              },
            }) => primary5};
          `
        }

        /* &:focus {
          background-color: ${({
            theme: {
              colors: { primary5 },
            },
          }) => primary5}; */
          border: ${({
            theme: {
              colors: { info100 },
            },
          }) => `2px solid ${info100}`};
        }

        &:disabled,
        &:disabled:focus,
        &:disabled:active,
        &:disabled:hover {
          background-color: ${({
            theme: {
              colors: { transparent },
            },
          }) => transparent};
          color: ${({
            theme: {
              colors: { primary50 },
            },
          }) => primary50};
          fill: ${({
            theme: {
              colors: { primary50 },
            },
          }) => primary50};
          border: ${({
            theme: {
              colors: { primary50 },
            },
          }) => `1px solid ${primary50}`};
        }

        &:active:not([disabled]) {
          color: ${({
            theme: {
              colors: { info100 },
            },
          }) => info100};
          fill: ${({
            theme: {
              colors: { info100 },
            },
          }) => info100};
          /* background-color: ${({
            theme: {
              colors: { info30 },
            },
          }) => info30}; */
          border: ${({
            theme: {
              colors: { info100 },
            },
          }) => `1px solid ${info100}`};
        }

        &:hover {
          background-color: ${({
            theme: {
              colors: { primary10 },
            },
          }) => primary10};
        }
      `;
    }
    case 'tertiary': {
      return css`
        color: ${({
          theme: {
            colors: { text100 },
          },
        }) => text100};
        fill: ${({
          theme: {
            colors: { text100 },
          },
        }) => text100};
        background-color: ${({
          theme: {
            colors: { secondary5 },
          },
        }) => secondary5};

        ${outlined &&
        css`
          border: ${({
            theme: {
              colors: { primary100 },
            },
          }) => `2px solid ${primary100}`};
        `}

        /* &:focus {
          color: ${({
          theme: {
            colors: { info100 },
          },
        }) => info100};
          fill: ${({
          theme: {
            colors: { info100 },
          },
        }) => info100};
          background-color: ${({
          theme: {
            colors: { primary10 },
          },
        }) => primary10};
          border: ${({
          theme: {
            colors: { info100 },
          },
        }) => `2px solid ${info100}`};
        } */

        &:disabled,
        &:disabled:focus,
        &:disabled:active,
        &:disabled:hover {
          background-color: ${({
            theme: {
              colors: { secondary5 },
            },
          }) => 'grey'};
          color: ${({
            theme: {
              colors: { text20 },
            },
          }) => text20};
          fill: ${({
            theme: {
              colors: { text20 },
            },
          }) => text20};
        }

        &:active:not([disabled]) {
          color: ${({
            theme: {
              colors: { info100 },
            },
          }) => info100};
          fill: ${({
            theme: {
              colors: { info100 },
            },
          }) => info100};
          /* background-color: ${({
            theme: {
              colors: { info30 },
            },
          }) => info30}; */
        }

        &:hover {
          background-color: ${({
            theme: {
              colors: { secondary20 },
            },
          }) => secondary20};
        }
      `;
    }
    case 'quartary': {
      return css`
        color: white !important;
        /* fill: ${({
          theme: {
            colors: { text100 },
          },
        }) => text100}; */
        background-color: transparent;

        /* ${outlined &&
        css`
          border: ${({
            theme: {
              colors: { primary100 },
            },
          }) => `2px solid ${primary100}`};
        `} */
      `;
    }
    default: {
      return null;
    }
  }
};

const ButtonContainer = styled.button<IButton>`
  width: ${({ width }) => width};
  outline: none;
  border: ${({
    theme: {
      colors: { transparent },
    },
  }) => `solid 2px ${transparent}`};
  cursor: 'pointer';
  padding: ${({ theme: { space }, size }) =>
    size === 'large' ? `${space[4]} ${space[5]}` : `${space[3]} ${space[5]}`};
  border-radius: ${({ theme: { space } }) => space[2]};
  transition: all ease 0.3s;
  font-style: normal;
  font-weight: ${({ theme: { fontWeights } }) => fontWeights.regular};
  font-size: ${({ theme: { fontSizes } }) => fontSizes[2]};
  line-height: ${({ theme: { space } }) => space[5]};

  ${({ expanded }) =>
    expanded &&
    css`
      width: 100%;
    `}

  ${space}
  ${layout}
  ${flexbox}
  ${variants}

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }

  color: black;
`;

export default ButtonContainer;
