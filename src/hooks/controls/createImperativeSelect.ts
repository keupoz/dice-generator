import { ListItem, TpChangeEvent } from "@tweakpane/core";
import { FolderApi, ListApi, ListBladeParams } from "tweakpane";
import { getFirstItem } from "../../utils/getFirstItem";
import { InputSetter } from "./createInput";

export type SelectOptionsSetter<T extends string> = (
  options: ListItem<T>[],
  value?: T
) => void;

export type Select<T extends string> = [InputSetter<T>, SelectOptionsSetter<T>];

export function createImperativeSelect<T extends string>(
  folder: FolderApi,
  options: ListItem<T>[],
  value: T | null,
  label: string,
  onChange: (e: TpChangeEvent<T>) => void
): Select<T> {
  value ??= getFirstItem(options).value;

  const params: ListBladeParams<T> = { view: "list", options, value, label };
  const blade = folder.addBlade(params) as ListApi<T>;

  blade.on("change", onChange);

  const setValue: InputSetter<T> = (value) => {
    blade.value = value;
  };

  const setOptions: SelectOptionsSetter<T> = (options, value) => {
    blade.options = options;

    if (value !== undefined) {
      setValue(value);
    }
  };

  return [setValue, setOptions];
}
