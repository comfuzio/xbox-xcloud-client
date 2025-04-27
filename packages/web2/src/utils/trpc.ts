import { createTRPCContext } from '@trpc/tanstack-react-query';
import { appRouter } from '@greenlight/platform/src/trpc';
 
export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<typeof appRouter>();