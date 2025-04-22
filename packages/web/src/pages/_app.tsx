'use client';

import { HeroUIProvider } from '@heroui/react'
import React from 'react'

import "../styles/globals.css";

import { createTRPCReact } from '@trpc/react-query';
import { QueryClient } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { createWSClient, wsLink } from '@trpc/client';
import AppRouter from '@greenlight/platform/dist/trpc.js'
import { GamepadNavigationProvider } from '../context/gamepadnav'

import Authentication from "../components/authentication";
import Header from "../components/header";

// Export trpcReact for usage in components
export const trpcReact = createTRPCReact<typeof AppRouter>();

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient, setTrpcClient] = useState(() =>
    trpcReact.createClient({
      links: [wsLink({
          client: createWSClient({
            url: createWebsocketUrl(),
          }),
        })
      ]
    })
  );

  function createWebsocketUrl() {
    let wsPort = 5050
    let wsHost = 'localhost'
    let wsProtocol = 'ws'

    if (typeof window !== "undefined") {
      wsPort = Number(localStorage.getItem('ws_port')) || 5050
      wsHost = localStorage.getItem('ws_host') || 'localhost'
      wsProtocol = localStorage.getItem('ws_protocol') || 'ws'
    }
    return `${wsProtocol}://${wsHost}:${wsPort}`;
  }

  return <React.StrictMode>
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <GamepadNavigationProvider>
        <HeroUIProvider>
          <main className="greenlight dark text-foreground bg-background">
            <Authentication>

              <div id="_app">
                <div id="header">
                  <Header />
                </div>
                <Component {...pageProps} />
              </div>


            </Authentication>
          </main>
        </HeroUIProvider>
      </GamepadNavigationProvider>
    </trpcReact.Provider>
  </React.StrictMode>;
}
