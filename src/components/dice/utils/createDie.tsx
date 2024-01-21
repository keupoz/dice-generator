import { FC, memo } from "react";
import { AbstractDie } from "../AbstractDie";
import { createDieInfo } from "./createDieInfo";
import { useDiceRegistry } from "./registry";
import { DieConfig, DieInputConfig } from "./types";

export function createDie<T extends Record<string, DieInputConfig>>(
  config: DieConfig<T>
): FC {
  const info = createDieInfo(config);

  return memo(() => {
    useDiceRegistry(info);

    return <AbstractDie info={info} />;
  });
}
