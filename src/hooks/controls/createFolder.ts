import { onCleanup } from "solid-js";
import { FolderApi } from "tweakpane";

export function createFolder(
  parent: FolderApi,
  title: string,
  expanded?: boolean
) {
  const folder = parent.addFolder({ title, expanded });

  onCleanup(() => {
    folder.dispose();
  });

  return folder;
}
