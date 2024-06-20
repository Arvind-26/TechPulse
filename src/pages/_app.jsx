import Nav from '../components/Nav'
import { AppProvider } from '../context/AppContext';
import Foot from '../components/footer'
import React from 'react';

function MyApp({ Component, pageProps }) {
  return <AppProvider>
    <Nav />
    <Component {...pageProps} />
    <Foot />

    </AppProvider>
}

export default MyApp