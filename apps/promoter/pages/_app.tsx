import { AppProps } from 'next/app';
import { Urbanist } from 'next/font/google';
import Head from 'next/head';
import { AuthProvider } from '@awareness/auth';
import favicon from '../public/favicon.ico';
import EventContext from './events/event-context';
import CreateGuidelinesContext from './create-guidelines/create-guidelines-context';

const urbanist = Urbanist({
  weight: '400',
  subsets: ['latin'],
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to AwarenessPass!</title>
        <link rel="icon" href={favicon.src} />
      </Head>
      <AuthProvider>
        <EventContext>
          <CreateGuidelinesContext>
            <Component className={urbanist.className} {...pageProps} />
          </CreateGuidelinesContext>
        </EventContext>
      </AuthProvider>
    </>
  );
}

export default CustomApp;
