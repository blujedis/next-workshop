import { FC } from 'react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import ProgressBar from './progress';
import { Provider as StoreProvider } from './store';
import { Provider as NextProvider } from 'next-auth/client';
import { RouteChangeProvider } from './routechange';
import { Provider as ThemeProvider, ThemedGlobals } from 'styles';

const theme = {};

const Providers: FC<AppProps> = ({ children, pageProps }) => {
  return (
    <NextProvider session={pageProps.session}>
      <StoreProvider>
        <ProgressBar />
        <RouteChangeProvider>
          <ThemeProvider>
            <ThemedGlobals />
            {children}
          </ThemeProvider>
        </RouteChangeProvider>
      </StoreProvider >
    </NextProvider>
  );
};

export default Providers;