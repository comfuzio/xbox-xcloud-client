/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { WorkerEntrypoint } from 'cloudflare:workers';
import { appRouter } from '@greenlight/platform';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		// switch (url.pathname) {
			// case '/trpc/*':
			// 	return fetchRequestHandler({
			// 		endpoint: '/trpc',
			// 		req: request,
			// 		router: appRouter,
			// 		createContext: () => ({}),
			// 	});
			// 	// return new Response('Hello, World!');
			// case '/random':
			// 	return new Response(crypto.randomUUID());
			// default:
			// 	return new Response('Not Found', { status: 404 });
		// }

		if(url.pathname.startsWith('/trpc')) {
			return fetchRequestHandler({
				endpoint: '/trpc',
				req: request,
				router: appRouter,
				createContext: () => ({}),
			});
		} else if(url.pathname === '/random') {
			return new Response(crypto.randomUUID());
		} else {
			return new Response('Not Found', { status: 404 });
		}
	},
} satisfies ExportedHandler<Env>;


/**
 * Welcome to Cloudflare Workers!
 *
 * - Run `yarn dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 *   Tip: Test going to the /hello or /post.listPosts endpoints
 * - Run `wrangler publish --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
// import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
// import { WorkerEntrypoint } from 'cloudflare:workers';
// import { appRouter } from '@greenlight/platform';

// export default class TRPCCloudflareWorkerExample extends WorkerEntrypoint {
//   async fetch(request: Request): Promise<Response> {
//     return fetchRequestHandler({
//       endpoint: '/trpc',
//       req: request,
//       router: appRouter,
//       createContext: () => ({}),
//     });
//   }
// }