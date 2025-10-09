import './global.css';
import { StyledComponentsRegistry } from './registry';
import { ApolloWrapper } from './lib/apollo-wrapper';
import Head from 'next/head';
export const metadata = {
  title: 'AwarenessPass Admin',
  description: 'Admin panel for AwarenessPass',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      <body>
        <ApolloWrapper>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ApolloWrapper>
      </body>
    </html>
  );
}
