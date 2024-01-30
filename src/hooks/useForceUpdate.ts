import { createContext, useContext, useLayoutEffect, useReducer } from "react";

export function useForceUpdate() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  return forceUpdate;
}

export function createForceUpdateContext() {
  const context = createContext(() => {});

  function useUpdateContext() {
    const updateCSG = useContext(context);

    useLayoutEffect(() => {
      updateCSG();
    });
  }

  return [context, useUpdateContext] as const;
}
