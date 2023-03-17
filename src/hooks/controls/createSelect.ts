import { ListItem } from "@tweakpane/core";
import { createSignal } from "solid-js";
import { FolderApi, ListApi, ListBladeParams } from "tweakpane";
import { getFirstItem } from "../../utils/getFirstItem";
import { Input, InputSetter } from "./createInput";

export type SelectOptionsSetter<T extends string> = (
  options: ListItem<T>[],
  value?: T
) => void;

export type Select<T extends string> = [...Input<T>, SelectOptionsSetter<T>];

export function createSelect<T extends string>(
  folder: FolderApi,
  options: ListItem<T>[],
  value: T | null,
  label: string
): Select<T> {
  value ??= getFirstItem(options).value;

  const [signal, setSignal] = createSignal(value);

  const params: ListBladeParams<T> = { view: "list", options, value, label };
  const blade = folder.addBlade(params) as ListApi<T>;

  blade.on("change", (e) => {
    setSignal(() => e.value);
  });

  const setValue: InputSetter<T> = (value) => {
    setSignal(() => value);
    blade.value = value;
  };

  const setOptions: SelectOptionsSetter<T> = (options, value) => {
    blade.options = options;

    if (value !== undefined) {
      setValue(value);
    }
  };

  return [signal, setValue, setOptions];
}
