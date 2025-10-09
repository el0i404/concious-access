import { ReactNode } from 'react';
import Image from 'next/image';
import { UIProvider, Flex } from '@awareness/ui';

const Layout = ({ children }: { children: ReactNode }) => (
  <UIProvider>
    <LayoutWrapper>{children}</LayoutWrapper>
  </UIProvider>
);

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      overflow="auto"
      height="100svh"
      flexDirection="column"
      alignItems="center"
      padding="24px 16px 32px 16px"
      backgroundColor="var(--brand-black, #1C1C1C);"
      overflowX="hidden"
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
        height="170px"
        pt="16px"
        width={['350px', '565px']}
      >
        <Image
          priority
          src="/no@2x.svg"
          width={200}
          height={50}
          alt="Go back"
        />
      </Flex>
      <Flex flexDirection="column" alignItems="center">
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
