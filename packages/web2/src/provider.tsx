// import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";

import { GamepadNavigationProvider } from './providers/gamepadnav'
import { TrpcProviderComponent } from './providers/trpc'
import { StorageProvider } from "./providers/storage";

import { ToastProvider } from "@heroui/react";

// declare module "@react-types/shared" {
//   interface RouterConfig {
//     routerOptions: NavigateOptions;
//   }
// }

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <TrpcProviderComponent>
      <GamepadNavigationProvider>
        <StorageProvider>
          <HeroUIProvider navigate={navigate} useHref={useHref}>
            <ToastProvider toastProps={{
              timeout: 5000
            }} />
            
            {children}
          </HeroUIProvider>
        </StorageProvider>
      </GamepadNavigationProvider>
    </TrpcProviderComponent>
  );
}
