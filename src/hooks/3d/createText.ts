import { BufferedGeom3 } from "@/BufferedGeom3";
import { geometry2cad } from "@/utils/3d/convert/three2cad";
import { parsePathCommands } from "@/utils/cad/paths/parsePathCommands";
import { Font } from "opentype.js";
import { Accessor, createMemo } from "solid-js";

const cache = new Map<string, BufferedGeom3>();
let currentFont: Font | null = null;
let currentSegments: number = -1;

export function createText(
  text: Accessor<string>,
  font: Accessor<Font>,
  segments: Accessor<number>
) {
  return createMemo(() => {
    if (text().trim().length === 0) return null;

    if (currentFont !== font() || currentSegments !== segments()) {
      cache.clear();

      currentFont = font();
      currentSegments = segments();
    } else {
      const cached = cache.get(text());

      if (cached) return cached;
    }

    const path = font().getPath(text(), 0, 0, 1);
    const geometry = parsePathCommands(path.commands, segments(), 2);

    const result = geometry2cad(geometry);

    cache.set(text(), result);

    return result;
  });
}
