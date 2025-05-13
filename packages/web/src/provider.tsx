// import type { NavigateOptions } from "react-router-dom";

import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";

import { GamepadNavigationProvider } from './providers/gamepadnav'
import { TrpcProviderComponent } from './providers/trpc'
import { StorageProvider } from "./providers/storage";
import { TitleManagerProvider } from "./providers/titlemanager";

import { ToastProvider } from "@heroui/react";
import { ModalProvider } from "./providers/modal";

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
          <TitleManagerProvider>
            <HeroUIProvider navigate={navigate} useHref={useHref}>
              <ModalProvider>
                <ToastProvider toastProps={{
                  timeout: 5000
                }} />
                
                {children}
              </ModalProvider>
            </HeroUIProvider>
          </TitleManagerProvider>
        </StorageProvider>
      </GamepadNavigationProvider>
    </TrpcProviderComponent>
  );
}
