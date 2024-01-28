import { FONT_MATERIAL } from "@/materials";
import { GlyphRun } from "fontkit";
import { Brush } from "three-bvh-csg";
import { getArrayItem } from "../getArrayItem";
import { getGlyphGeometry } from "./getGlyphGeometry";

export function layout2brushes(layout: GlyphRun, segments: number) {
  let offset = 0;

  return layout.glyphs.map((glyph, i) => {
    const position = getArrayItem(layout.positions, i);
    offset += position.xOffset;

    const geometry = getGlyphGeometry(glyph, segments);
    const brush = new Brush(geometry, FONT_MATERIAL);

    brush.position.x = offset;
    offset += position.xAdvance;

    return brush;
  });
}
