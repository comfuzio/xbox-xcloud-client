import type { AppProps } from 'next/app'
import { TrpcProviderComponent } from '../providers/trpc'
import { AuthProvider } from '../contexts/AuthContext'
import App from './app'


import '../styles/globals.css'

function GreenlightDesktop({ Component, pageProps }: AppProps) {

  return (
    <TrpcProviderComponent>
      <AuthProvider>
        <App>
        <Component {...pageProps} />
        </App>
      </AuthProvider>
    </TrpcProviderComponent>
  );
}

export default GreenlightDesktop
