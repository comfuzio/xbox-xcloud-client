import type { AppProps } from 'next/app'
import { TrpcProviderComponent } from '../providers/trpc'

import '../styles/globals.css'

function GreenlightDesktop({ Component, pageProps }: AppProps) {
  return (
    <TrpcProviderComponent>
      <Component {...pageProps} />
    </TrpcProviderComponent>
  );
}

export default GreenlightDesktop
