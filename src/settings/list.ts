import { ListItem } from "@tweakpane/core";
import { FolderApi, ListApi, ListBladeParams } from "tweakpane";

export function createListBlade<T extends string>(
  folder: FolderApi,
  options: ListItem<T>[],
  value: T | null,
  label: string
) {
  const params: ListBladeParams<T> = {
    view: "list",
    options,
    value: value ?? options[0]?.value ?? ("" as T),
    label,
  };

  return folder.addBlade(params) as ListApi<T>;
}
