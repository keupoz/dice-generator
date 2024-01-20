import { DieInfo } from "./types";

const registeredDice: Record<string, DieInfo> = {};

export function mapDice<T>(mapper: (name: string, info: DieInfo) => T) {
  const result: T[] = [];

  for (const [name, info] of Object.entries(registeredDice)) {
    result.push(mapper(name, info));
  }

  return result;
}

export function registerDie(name: string, info: DieInfo) {
  registeredDice[name] = info;
}
