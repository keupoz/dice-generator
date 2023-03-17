import { BufferedGeom3 } from "@/BufferedGeom3";
import { measureBoundingBox } from "@jscad/modeling/src/measurements";
import { translateX } from "@jscad/modeling/src/operations/transforms";
import { Font } from "opentype.js";
import { Accessor, createMemo } from "solid-js";
import { createText } from "../../hooks/3d/createText";

export type Text1Result = [
  geometry: Accessor<BufferedGeom3 | null>,
  offset: Accessor<number>
];

export function createText1(
  text: Accessor<string>,
  font: Accessor<Font>,
  segments: Accessor<number>
): Text1Result {
  const geom = createText(text, font, segments);

  const offset = createMemo(() => {
    const accessedGeom = geom();

    if (accessedGeom === null) return 0;

    const bounds = measureBoundingBox(accessedGeom);

    return (bounds[0][0] + bounds[1][0]) / 2;
  });

  const finalGeom = createMemo(() => {
    const accessedGeom = geom();

    if (accessedGeom === null) return null;

    return translateX(-offset(), accessedGeom);
  });

  return [finalGeom, offset];
}
