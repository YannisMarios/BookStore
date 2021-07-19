import ButtonAppBar from '@/components/shared/ButtonAppBar';
import '@/styles/carousel.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React, { FC, Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import '../styles/globals.css';
import theme from '../theme';
import '../typings/string';

React.useLayoutEffect = React.useEffect;

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles?.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Bookstore</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider store={store}>
          <ButtonAppBar />
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </Fragment>
  );
};

export default MyApp;
