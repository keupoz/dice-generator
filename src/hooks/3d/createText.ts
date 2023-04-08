import { interpretCommands } from "@/utils/paths/interpretCommands";
import { polygons2geom } from "@/utils/paths/polygons2geom";
import { sortPolygons } from "@/utils/paths/sortPolygons";
import { Geom3 } from "@jscad/modeling/src/geometries/types";
import { Font } from "opentype.js";
import { Accessor, createMemo } from "solid-js";

const cache = new Map<string, Geom3>();
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

    const { commands } = font().getPath(text(), 0, 0, 1);
    const polygons = interpretCommands(commands, segments());
    const sortedPolygons = sortPolygons(polygons);
    const geom = polygons2geom(sortedPolygons);

    cache.set(text(), geom);

    return geom;
  });
}
