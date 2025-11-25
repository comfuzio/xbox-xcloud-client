# @greenlight/platform-playground

A web-based playground for interacting with the Greenlight platform library via tRPC.

## Features

- 🚀 **Vite** for fast HMR and optimized builds
- ⚛️ **React** + TypeScript for the UI
- 🔌 **tRPC Client** for type-safe API calls
- 🔥 **Hot Module Reload** for instant development feedback
- 🎯 **Integrated Server** runs both the tRPC backend and frontend

## Development

Start the development server (runs both tRPC server and Vite):

```bash
yarn dev
```

This will start:
- tRPC server on `http://localhost:3000`
- Vite dev server on `http://localhost:5173` (with HMR)

## Build

Build for production:

```bash
yarn build
```

Preview production build:

```bash
yarn preview
```

## Project Structure

```
packages/platform-playground/
├── src/
│   ├── server/          # tRPC server setup
│   │   └── index.ts
│   ├── client/          # React application
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── trpc.ts      # tRPC client configuration
│   └── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```
