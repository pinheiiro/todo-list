import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '../styles/theme';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default MyApp