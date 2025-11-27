"use client";

import { MetalEntry } from "@/Type/Type";
import React, { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  username: string;
  setUsername: (value: string) => void;
  entries: MetalEntry[];
  setEntries: React.Dispatch<React.SetStateAction<MetalEntry[]>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("guest");
  const [entries, setEntries] = useState<MetalEntry[]>([]);
  return (
    <AppContext.Provider value={{ username, setUsername, entries, setEntries }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
