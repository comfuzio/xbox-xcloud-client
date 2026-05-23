import React from 'react'
import Head from 'next/head'

// import { useQueryClient } from "@tanstack/react-query";
// import { useTRPC } from "../../utils/trpc";
import { useAuth } from '../../contexts/AuthContext';

export default function HomePage() {
  // const trpc = useTRPC();
  // const queryClient = useQueryClient();

  // const { isAuthenticated, isAuthenticating, authState, startAuth } = useAuth();
  const { startAuth } = useAuth();

  const getMessage = () => {
    startAuth().then((result) => {
      console.log('Authentication result:', result);
      document.getElementById('login-message')!.textContent = result?.message || 'Authentication failed';
    }).catch((error) => {
      console.error('Error during authentication:', error);
    });
    return "Retrieving login details...";
  }

  return (
    <React.Fragment>
      <Head>
        <title>Greenlight Authentication</title>
      </Head>
      <div className="flex h-screen bg-[#0d0d0d] bg-pattern overflow-hidden">
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
                    <h2 className="text-2xl font-bold text-white mb-1">You need to authenticate</h2>
                    <p className="text-white/40 text-sm">Login with your xbox account to continue</p>

                    <p id="login-message">{getMessage()}</p>
                  </div>
                </div>
              </div>

              {/* End of main content */}
            </main>
          </div>
    </React.Fragment>
  )
}
