import { useEffect } from "react";
import { create } from "zustand";
import { DieInfo } from "./types";

export interface DiceRegistryStore {
  dice: DieInfo[];
}

export const useDiceRegistryStore = create<DiceRegistryStore>(() => ({
  dice: [],
}));

export function useDiceRegistry(info: DieInfo) {
  useEffect(() => {
    useDiceRegistryStore.setState((prev) => ({ dice: [...prev.dice, info] }));

    return () => {
      useDiceRegistryStore.setState((prev) => {
        return { dice: prev.dice.filter((item) => item !== info) };
      });
    };
  }, [info]);
}
