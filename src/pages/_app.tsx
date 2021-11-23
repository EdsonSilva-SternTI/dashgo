import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '../contexts/AuthContext';
import { SidebarDrawerProvider } from 'contexts/SidebarDrawerContext';
import { theme } from 'styles/theme';
import { Provider as NextAuthProvider } from 'next-auth/client';

// if (process.env.NODE_ENV === 'development') {
//   makeServer();
// }

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <NextAuthProvider session={pageProps.session}>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
        </ChakraProvider>
    </AuthProvider>
    </NextAuthProvider>
   );
}

export default MyApp;
