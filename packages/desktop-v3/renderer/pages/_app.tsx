import type { AppProps } from 'next/app'

import '../styles/globals.css'

function GreenlightDesktop({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default GreenlightDesktop
