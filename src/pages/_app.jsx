import Navv from '../components/nav'
import { AppProvider } from '../context/AppContext';
import Foot from '../components/footer'
import React from 'react';

function MyApp({ Component, pageProps }) {
  return <AppProvider>
    <Navv />
    <Component {...pageProps} />
    <Foot />

    </AppProvider>
}

export default MyApp