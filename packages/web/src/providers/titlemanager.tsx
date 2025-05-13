import { createContext, useState, ReactNode } from 'react';

export interface TitleManagerContextType {
    metadata: Map<string, any>;
    games: Map<string, any>;
    setMetadata: (metadata:Map<string, any>) => void;
    setGames: (games:Map<string, any>) => void;
}

export interface TitleManagerProviderProps {
  children: ReactNode
}

export const TitleManagerContext = createContext<TitleManagerContextType>({
  metadata: new Map<string, any>(),
  games: new Map<string, any>(),
  setMetadata: (items) => { console.log(items) },
  setGames: (items) => { console.log(items) },
});

export const TitleManagerProvider = ({ children }:TitleManagerProviderProps) => {
  const [metadata, setMetadataOrg] = useState(new Map<string, any>());
  const [games, setGamesOrg] = useState(new Map<string, any>());

  const setMetadata = (items: Map<string, any>) => {
    setMetadataOrg((prev) => new Map([...prev, ...items]));
  };

  const setGames = (items: Map<string, any>) => {
    setGamesOrg((prev) => new Map([...prev, ...items]));
  };

  return (
    <TitleManagerContext.Provider value={{ metadata, games, setMetadata, setGames }}>
      {children}
    </TitleManagerContext.Provider>
  );
};
