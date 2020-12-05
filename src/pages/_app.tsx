import '../../styles/globals.css';
import { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
const App: React.FunctionComponent<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="http://localhost:3001/zoid.min.js"></script>
        <script
          type="text/javascript"
          src="http://localhost:3001/widget.js"></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
