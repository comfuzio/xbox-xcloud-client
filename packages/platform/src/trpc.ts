import { initTRPC } from '@trpc/server';
import { z } from 'zod';

import authController from './controller/auth.js';

const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;

const auth = new authController();

export const appRouter = router({
  ping: publicProcedure.query(() => 'pong'),
  echo: publicProcedure.input(z.string()).query(({ input }) => `echo: ${input}`),

  auth_msal_start: publicProcedure.query(async () => await auth.startMsalAuth()),
  auth_msal_verify: publicProcedure.input(z.string()).query(async ({ input }) => await auth.verifyDeviceCode(input)),
  auth_get_streamingtokens: publicProcedure.input(z.string()).query(async ({ input }) => await auth.getStreamingTokens(input)),
  auth_get_webtoken: publicProcedure.input(z.string()).query(async ({ input }) => await auth.getWebToken(input)),

});

export default appRouter;
