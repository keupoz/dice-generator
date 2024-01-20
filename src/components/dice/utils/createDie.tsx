import { FC, memo } from "react";
import { AbstractDie } from "../AbstractDie";
import { createDieInfo } from "./createDieInfo";
import { registerDie } from "./registry";
import { DieConfig, DieInputConfig } from "./types";

export function createDie<T extends Record<string, DieInputConfig>>(
  config: DieConfig<T>
): FC {
  const info = createDieInfo(config);

  registerDie(config.name, info);

  return memo(() => {
    return <AbstractDie info={info} />;
  });
}
