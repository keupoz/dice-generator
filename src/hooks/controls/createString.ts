import { FolderApi } from "tweakpane";
import { createInput } from "./createInput";

export function createString(folder: FolderApi, value: string, label: string) {
  return createInput(folder, value, { label });
}
