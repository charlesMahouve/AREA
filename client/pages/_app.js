import '../styles/globals.css'
import { AppProvider } from '../components/Context'
import NavBar from '../components/NavBar'
import { useCtx } from '../components/Context'
import React from 'react';
import { useRouter } from 'next/router'


function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <NavBar>
        <Component {...pageProps} />
      </NavBar>
    </AppProvider>
  )
}

export default MyApp
