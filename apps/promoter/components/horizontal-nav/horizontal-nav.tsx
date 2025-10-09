import React from 'react';
import { useRouter } from 'next/router';
import { useIsMobile } from '@awareness/hooks';
import NavigationContainer from './styles/navigation-container.styled';
import UnOrderItems from './styles/unorder-items.styled';
import NavigationItem from './styles/navigation-item.styled';
import NavigationLink from './styles/navigation-link.styled';

export const navLinks = [
  {
    name: 'Events',
    path: '/events',
  },
  {
    name: 'Scanner',
    path: '/scanner',
  },
];

const HorizontalNav = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <NavigationContainer>
      {navLinks.map(({ path, name }, index) => {
        const routeMatch = currentRoute === path;
        if (!isMobile && name === 'Scanner') {
          return null;
        }
        return (
          <UnOrderItems key={index}>
            <NavigationLink href={path}>
              <NavigationItem
                routeMatch={routeMatch}
                style={{
                  borderBottom: routeMatch ? '1px solid white' : 'none',
                }}
              >
                {name}
              </NavigationItem>
            </NavigationLink>
          </UnOrderItems>
        );
      })}
    </NavigationContainer>
  );
};

export default HorizontalNav;
