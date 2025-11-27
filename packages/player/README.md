# @greenlight/player

WebRTC streaming player library for Greenlight. Provides both client-side React components and server-side stream management functions.

## Installation

```bash
# From workspace root
yarn player build
```

## Package Exports

This package provides three entry points:

| Entry Point | Description |
|-------------|-------------|
| `@greenlight/player/client` | React components and hooks for the player UI |
| `@greenlight/player/server` | Node.js functions for stream management via HTTP |
| `@greenlight/player/types` | Shared TypeScript interfaces |

## Client Usage

### Player Component

```tsx
import { Player } from '@greenlight/player/client';
import type { StreamSession } from '@greenlight/player/types';

function StreamingPage() {
  const session: StreamSession = {
    id: 'session-123',
    state: 'pending',
    createdAt: Date.now(),
  };

  return (
    <Player
      session={session}
      onConnect={() => console.log('Connected!')}
      onDisconnect={() => console.log('Disconnected')}
      onError={(error) => console.error('Error:', error.message)}
      onStateChange={(state) => console.log('State:', state.connectionState)}
      enableGamepad={true}
      className="my-player"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
```

### usePlayer Hook

```tsx
import { usePlayer } from '@greenlight/player/client';
import type { StreamSession } from '@greenlight/player/types';

function StreamingControls({ session }: { session: StreamSession }) {
  const {
    state,
    connect,
    disconnect,
    sendGamepadInput,
    createOffer,
    setRemoteAnswer,
    addIceCandidate,
    onIceCandidate,
  } = usePlayer({
    session,
    enableGamepad: true,
    onStateChange: (state) => console.log('State changed:', state),
  });

  return (
    <div>
      <p>Connection: {state.connectionState}</p>
      <p>Video: {state.isVideoActive ? 'Active' : 'Inactive'}</p>
      <p>Audio: {state.isAudioActive ? 'Active' : 'Inactive'}</p>
      
      <button onClick={connect} disabled={state.connectionState !== 'pending'}>
        Connect
      </button>
      <button onClick={disconnect} disabled={state.connectionState !== 'connected'}>
        Disconnect
      </button>
    </div>
  );
}
```

## Server Usage

The server module provides functions for managing streaming sessions via HTTP requests. These functions are designed to be used within a tRPC server or any Node.js backend.

```typescript
import {
  requestStream,
  handleSdpExchange,
  addIceCandidate,
  destroyStream,
} from '@greenlight/player/server';
import type {
  StreamRequestConfig,
  SdpOffer,
  IceCandidate,
} from '@greenlight/player/types';

// Request a new stream session
const config: StreamRequestConfig = {
  target: 'console-123',
  quality: {
    maxWidth: 1920,
    maxHeight: 1080,
    maxBitrate: 15000,
  },
};
const response = await requestStream(config);

if (response.success && response.session) {
  const session = response.session;
  
  // Exchange SDP offer/answer
  const offer: SdpOffer = { type: 'offer', sdp: '...' };
  const answer = await handleSdpExchange(session.id, offer);
  
  // Add ICE candidates
  const candidate: IceCandidate = {
    candidate: 'candidate:...',
    sdpMLineIndex: 0,
    sdpMid: 'video',
  };
  await addIceCandidate(session.id, candidate);
  
  // Later: destroy the session
  await destroyStream(session.id);
}
```

### Integration with @greenlight/platform (tRPC)

In your platform package's `trpc.ts`:

```typescript
import { router, publicProcedure } from './trpc';
import { z } from 'zod';
import {
  requestStream,
  handleSdpExchange,
  addIceCandidate,
  destroyStream,
} from '@greenlight/player/server';

// Add to your appRouter
export const streamRouter = router({
  request: publicProcedure
    .input(z.object({
      target: z.string(),
      quality: z.object({
        maxWidth: z.number().optional(),
        maxHeight: z.number().optional(),
        maxBitrate: z.number().optional(),
      }).optional(),
    }))
    .mutation(({ input }) => requestStream(input)),

  sdp: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      offer: z.object({
        type: z.literal('offer'),
        sdp: z.string(),
      }),
    }))
    .mutation(({ input }) => handleSdpExchange(input.sessionId, input.offer)),

  ice: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      candidate: z.object({
        candidate: z.string(),
        sdpMLineIndex: z.number().nullable(),
        sdpMid: z.string().nullable(),
      }),
    }))
    .mutation(({ input }) => addIceCandidate(input.sessionId, input.candidate)),

  destroy: publicProcedure
    .input(z.string())
    .mutation(({ input }) => destroyStream(input)),
});
```

## Types

All shared types are available from `@greenlight/player/types`:

```typescript
import type {
  // Session types
  StreamSession,
  StreamSessionState,
  StreamRequestConfig,
  StreamRequestResponse,
  StreamQualitySettings,
  
  // WebRTC signaling types
  SdpOffer,
  SdpAnswer,
  IceCandidate,
  
  // Player component types
  PlayerProps,
  PlayerState,
  PlayerError,
  
  // Gamepad input types
  GamepadInput,
  GamepadButtonState,
} from '@greenlight/player/types';
```

## Development

### Build

```bash
# Build all (types, client, server)
yarn player build

# Build individual targets
yarn player build:types
yarn player build:client
yarn player build:server

# Clean build artifacts
yarn player clean
```

### Test

```bash
yarn player test
```

### Project Structure

```
packages/player/
├── src/
│   ├── types/          # Shared TypeScript interfaces
│   │   └── index.ts
│   ├── client/         # React components and hooks
│   │   ├── index.ts
│   │   ├── Player.tsx
│   │   └── usePlayer.ts
│   └── server/         # Node.js stream management
│       ├── index.ts
│       └── stream.ts
├── tests/
│   └── server/
│       └── stream.spec.ts
├── dist/               # Build output
│   ├── client.js       # Client bundle
│   ├── client.d.ts     # Client types
│   ├── server.js       # Server bundle
│   ├── server.d.ts     # Server types
│   └── types/          # Shared types
├── package.json
├── tsconfig.json
├── vite.config.ts      # Client build config
└── tsup.config.ts      # Server build config
```

## License

MIT
