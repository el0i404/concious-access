import styled from 'styled-components';

const NavigationItem = styled.li<{ routeMatch: boolean }>`
  &:active,
  &:focus {
    border-bottom: ${({ routeMatch }) => (routeMatch ? '1px solid white' : '')};
  }

  color: ${({ routeMatch }) => (routeMatch ? 'white' : '#3C3C3C')};
`;

export default NavigationItem;
