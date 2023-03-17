import { FolderApi } from "tweakpane";
import { createInput } from "./createInput";

export function createBoolean(
  folder: FolderApi,
  value: boolean,
  label: string
) {
  return createInput(folder, value, { label });
}
