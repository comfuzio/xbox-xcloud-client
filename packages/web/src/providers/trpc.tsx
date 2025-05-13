import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import { createWSClient, wsLink, createTRPCClient, TRPCClientError } from '@trpc/client';
import { useState, ReactNode } from 'react';
import { TRPCProvider } from '../utils/trpc';
import { showErrorToast } from '../utils/toast';
import appRouter from '@greenlight/platform/src/trpc'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        const message = getTrpcErrorMessage(error);
        showErrorToast(message);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        const message = getTrpcErrorMessage(error);
        showErrorToast(message);
      },
    }),
  });
}

function getTrpcErrorMessage(error: unknown): string {
  if (error instanceof TRPCClientError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred.";
}

let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
function createWebsocketUrl() {
    let wsPort = 5050
    let wsHost = 'localhost'
    let wsProtocol = 'ws'

    if (typeof window !== "undefined") {
      wsPort = Number(localStorage.getItem('ws_port')) || 5050
      wsHost = localStorage.getItem('ws_host') || window.location.hostname
      wsProtocol = localStorage.getItem('ws_protocol') || 'ws'
    }
    return `${wsProtocol}://${wsHost}:${wsPort}`;
}
export const TrpcProviderComponent = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<typeof appRouter>({
      links: [
        wsLink({
            client: createWSClient({
                url: createWebsocketUrl(),
            }),
        })
      ],
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}