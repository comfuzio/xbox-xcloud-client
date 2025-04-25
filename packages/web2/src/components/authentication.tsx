'use client';

import { useEffect, useState, Fragment } from 'react'
import { Button, ButtonGroup, CircularProgress } from '@heroui/react'

import Head from 'next/head'
// import styles from '@/styles/Home.module.css'

import { getLocalStorage, setSessionStorage } from '../utils/localstorage'
import { trpcReact } from '../providers/trpc';


import MsalAuthentication from './authentication/msal'

interface AuthenticationProps {
  children: React.ReactNode;
}

export default function Authentication({ children }:AuthenticationProps) {
  const [authMethod, setAuthMethod] = useState('none')
  const [signedInMethod] = useState(getLocalStorage('auth_method') ?? 'none')

  // Check if we have local tokens
  const [webToken] = useState(getLocalStorage('auth_web_token') ?? undefined)
  const [xCloudToken] = useState(getLocalStorage('auth_xcloud_token') ?? undefined)
  const [xHomeToken] = useState(getLocalStorage('auth_xhome_token') ?? undefined)
  
  const [userToken] = useState(getLocalStorage('auth_data_msal') ?? '{}')
  const { data: streamingTokens, isLoading: loadingStreamingTokens } = trpcReact.auth_get_streamingtokens.useQuery(
    (userToken),
    { enabled: (signedInMethod !== 'none') }
  );
  const { data: webTokens, isLoading: loadingWebTokens } = trpcReact.auth_get_webtoken.useQuery(
    (userToken),
    { enabled: (signedInMethod !== 'none') }
  );
  // const { setActiveGroup } = useGamepadNavigation();

  // Workaround for server-side rendering issues
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render nothing on the server to avoid mismatched HTML
    return null;
  }

  if(signedInMethod !== 'none'){

    if(webTokens !== undefined){
      setSessionStorage('auth_web_token', JSON.stringify(webTokens.data))
    }
    if(streamingTokens !== undefined){
      setSessionStorage('auth_xcloud_token', JSON.stringify(streamingTokens.xCloudToken.data))
      setSessionStorage('auth_xhome_token', JSON.stringify(streamingTokens.xHomeToken.data))
    }
  }

  return (
    <>
      <Head>
        <title>Authentication</title>
      </Head>
      {
        signedInMethod !== 'none' ? 
          // We are signed in, but we dont have tokens yet..
          (loadingStreamingTokens || loadingWebTokens) ?
            <div>
              <center>
                <CircularProgress label="Loading..." />
              </center>
            </div> :
          // We are signed in, and we have the session tokens in the sessionStorage so lets show the UI
            <div>{ children }</div> :
        // We are not signed in, so we need to show the authentication methods & subpages
          authMethod === "msal" ? 
            <MsalAuthentication /> :
            <Fragment>
              <center>
                <Button tabIndex={0} key='1'data-nav data-nav-group="default" color="primary" onPress={() => { setAuthMethod('xal') }}>Start XAL</Button>
                <Button tabIndex={0} key='2' data-nav data-nav-group="default" color="primary" onPress={() => { setAuthMethod('msal') }}>Start MSAL</Button>
              </center>
            </Fragment>
      }
    </>
  );
}
