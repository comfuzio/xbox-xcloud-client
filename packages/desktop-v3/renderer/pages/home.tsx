import React from 'react'
import Head from 'next/head'
import Sidebar from '../components/sidebar'
// import Link from 'next/link'
// import Image from 'next/image'

import { useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "../utils/trpc";
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();



const { isAuthenticated, isAuthenticating, authState } = useAuth();

console.log('Authentication status in _app:', { isAuthenticated, isAuthenticating, authState });



  const ping = () => {
    queryClient.fetchQuery(trpc.ping.queryOptions())
      .then((data) => {
          console.log(data)
      })
      .catch((error) => {
          console.error('Error fetching data:', error);
      });
  }
  
  const getVersion = () => {
    queryClient.fetchQuery(trpc.version.queryOptions())
      .then((data) => {
          console.log(data)
      })
      .catch((error) => {
          console.error('Error fetching data:', error);
      });
  }

  return (
    <React.Fragment>
      <Head>
        <title>Greenlight</title>
      </Head>
      <div className="flex h-screen bg-[#0d0d0d] bg-pattern overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <main className="flex-1 overflow-hidden relative">
              {/* Ambient background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#107C10]/3 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#107C10]/2 rounded-full blur-3xl pointer-events-none" />

              {/* Main content area */}

              <div className="h-full overflow-y-auto">
                <div className="p-6 md:p-8 max-w-5xl mx-auto">
                  {/* Header */}
                  <div className="mb-6 animate-fade-in-up">
                    <h2 className="text-2xl font-bold text-white mb-1">Game Library</h2>
                    <p className="text-white/40 text-sm">0 titles in your collection</p>

                    <button onClick={ping}>Ping</button>
                    <button onClick={getVersion}>getVersion</button>
                  </div>
                </div>
              </div>

              {/* End of main content */}
            </main>
          </div>
    </React.Fragment>
  )
}
