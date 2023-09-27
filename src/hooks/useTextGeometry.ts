import { getArrayItem } from "@/utils/getArrayItem";
import { parsePathCommands } from "@/utils/parsePathCommands";
import { Font, PathCommand } from "fontkit";
import { useMemo } from "react";

export function useTextGeometry(
  font: Font | null,
  features: Record<string, boolean>,
  text: string,
  segments: number
) {
  const geometry = useMemo(() => {
    if (font === null) return null;

    const trimmedText = text.trim();

    if (trimmedText.length === 0) return null;

    const layout = font.layout(trimmedText, features);
    const scale = 1 / font.unitsPerEm;
    const glyphs: PathCommand[][] = [];

    let offset = 0;

    layout.glyphs.forEach((glyph, i) => {
      const position = getArrayItem(layout.positions, i);
      offset += position.xOffset;

      const path = glyph.path.translate(offset, 0);
      glyphs.push(path.commands);

      offset += position.xAdvance;
    });

    const geometry = parsePathCommands(glyphs, segments, 2);
    geometry.scale(scale, scale, 1);

    return geometry;
  }, [features, font, segments, text]);

  return geometry;
}
