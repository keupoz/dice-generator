import { Accessor, createSignal } from "solid-js";
import { FolderApi, InputParams } from "tweakpane";

export type InputSetter<T> = (value: T) => void;
export type Input<T> = [Accessor<T>, InputSetter<T>];

export function createInput<T>(
  folder: FolderApi,
  value: T,
  params: InputParams
): Input<T> {
  const [signal, setSignal] = createSignal(value);
  const object = { value };
  const input = folder.addInput(object, "value", params);

  input.on("change", (e) => {
    setSignal(() => e.value);
  });

  const setValue: InputSetter<T> = (value) => {
    setSignal(() => value);
    object.value = value;
    input.refresh();
  };

  return [signal, setValue];
}
