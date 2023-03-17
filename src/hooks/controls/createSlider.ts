import { FolderApi, NumberInputParams } from "tweakpane";
import { createInput } from "./createInput";

export function createSlider(
  folder: FolderApi,
  min: number,
  max: number,
  step: number,
  value: number,
  label: string
) {
  const params: NumberInputParams = { min, max, step, label };

  return createInput(folder, value, params);
}
