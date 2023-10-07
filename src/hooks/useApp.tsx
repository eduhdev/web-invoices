'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type AppContextData = {
  openMobMenu: boolean;
  handleMobMenu: () => void;
};

const AppDefaultValues = {
  openMobMenu: false,
  handleMobMenu: () => null,
};

export const AppContext = createContext<AppContextData>(AppDefaultValues);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [openMobMenu, setOpenMobMenu] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        openMobMenu,
        handleMobMenu: () => setOpenMobMenu((current) => !current),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => useContext(AppContext);

export { AppProvider, useApp };
