import Nav from '../components/nav'
import { AppProvider } from '../context/AppContext';
import Foot from '../components/footer'

function MyApp({ Component, pageProps }) {
  return <AppProvider>
    <Nav />
    <Component {...pageProps} />
    <Foot />

    </AppProvider>
}

export default MyApp