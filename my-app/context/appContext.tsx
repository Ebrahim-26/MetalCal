"use client";

import { metalList } from "@/data/metalList";
import { MetalEntry, metalListData } from "@/Type/Type";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type AppContextType = {
  username: string;
  setUsername: (value: string) => void;
  entries: MetalEntry[];
  setEntries: React.Dispatch<React.SetStateAction<MetalEntry[]>>;
  dropDownMetalList: metalListData[];
  setDropDownMetalList: React.Dispatch<React.SetStateAction<metalListData[]>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("guest");
  const [entries, setEntries] = useState<MetalEntry[]>([]);
  const [dropDownMetalList, setDropDownMetalList] =
    useState<metalListData[]>(metalList);
  useEffect(() => {
    const usedMetalIds = entries.map((entry) => entry.selectedMetal);
    setDropDownMetalList(
      metalList.filter((metal) => !usedMetalIds.includes(metal.id))
    );
  }, [entries]);
  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        entries,
        setEntries,
        dropDownMetalList,
        setDropDownMetalList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
