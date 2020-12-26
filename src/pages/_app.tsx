import '../../styles/globals.css';
import { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <script type="text/javascript" src={process.env.ZOID_URL}></script>
        <script type="text/javascript" src={process.env.WIDGET_URL}></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
