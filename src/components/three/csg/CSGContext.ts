import { createContext, useContext, useLayoutEffect } from "react";

export const CSGContext = createContext(() => {});

export function useUpdateCSG() {
  const updateCSG = useContext(CSGContext);

  useLayoutEffect(() => {
    updateCSG();
  });
}
