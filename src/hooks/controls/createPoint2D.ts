import { Vec2 } from "@jscad/modeling/src/maths/types";
import { Point2dObject } from "@tweakpane/core/dist/cjs/input-binding/point-2d/model/point-2d";
import { createSignal } from "solid-js";
import { FolderApi, Point2dInputParams } from "tweakpane";
import { Input, InputSetter } from "./createInput";

export function createPoint2D(
  folder: FolderApi,
  min: number,
  max: number,
  step: number,
  value: Vec2,
  label: string
): Input<Vec2> {
  const [signal, setSignal] = createSignal(value);

  const object: { value: Point2dObject } = {
    value: { x: value[0], y: value[1] },
  };

  const params: Point2dInputParams = {
    x: { min, max, step },
    y: { min, max, step, inverted: true },
    label,
  };

  const input = folder.addInput(object, "value", params);

  input.on("change", (e) => {
    setSignal([e.value.x, e.value.y]);
  });

  const setValue: InputSetter<Vec2> = (value) => {
    setSignal(() => value);
    object.value = { x: value[0], y: value[1] };
    input.refresh();
  };

  return [signal, setValue];
}
