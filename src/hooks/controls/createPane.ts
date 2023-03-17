import { onCleanup } from "solid-js";
import { Pane } from "tweakpane";

export function createPane(title: string) {
  const pane = new Pane({ title, expanded: false });

  onCleanup(() => {
    pane.dispose();
  });

  return pane;
}
