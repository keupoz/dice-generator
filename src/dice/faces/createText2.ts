import { measureBoundingBox } from "@jscad/modeling/src/measurements";
import { translate } from "@jscad/modeling/src/operations/transforms";
import { Font } from "opentype.js";
import { Accessor, createMemo } from "solid-js";
import { createText } from "../../hooks/3d/createText";

export function createText2(
  text: Accessor<string>,
  font: Accessor<Font>,
  segments: Accessor<number>,
  offset: Accessor<number>,
  isUnderscore: Accessor<boolean>,
  gap: Accessor<number>
) {
  const geom = createText(text, font, segments);

  const finalGeometry = createMemo(() => {
    const accessedGeom = geom();

    if (accessedGeom === null) return null;

    let x = 0;
    let y = 0;

    if (isUnderscore()) {
      const bounds = measureBoundingBox(accessedGeom);

      x = -(bounds[0][0] + bounds[1][0]) / 2;
      y = -bounds[1][1] - gap();
    } else {
      x = offset() + gap();
    }

    return translate([x, y], accessedGeom);
  });

  return finalGeometry;
}
