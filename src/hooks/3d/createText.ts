import { geometry2cad } from "@/utils/3d/convert/three2cad";
import { parsePathCommands } from "@/utils/cad/paths/parsePathCommands";
import { getArrayItem } from "@/utils/getArrayItem";
import transforms from "@jscad/modeling/src/operations/transforms";
import { Font, PathCommand } from "fontkit";
import { Accessor, createMemo } from "solid-js";
import { FontCache } from "../../FontCache";

export function createText(
  text: Accessor<string>,
  font: Accessor<Font>,
  features: Accessor<Record<string, boolean>>,
  segments: Accessor<number>,
  cache: FontCache
) {
  return createMemo(() => {
    const accessedText = text().trim();

    if (accessedText.length === 0) return null;

    const cached = cache.get(accessedText, font(), segments(), features());

    if (cached) return cached;

    const layout = font().layout(text(), { ...features() });
    const scale = 1 / font().unitsPerEm;
    const commands: PathCommand[] = [];

    let offset = 0;

    layout.glyphs.forEach((glyph, i) => {
      const position = getArrayItem(layout.positions, i);
      offset += position.xOffset;

      const path = glyph.path.translate(offset, 0);
      commands.push(...path.commands);

      offset += position.xAdvance;
    });

    const geometry = parsePathCommands(commands, segments(), 2);

    const result = transforms.scale([scale, scale, 1], geometry2cad(geometry));

    cache.save(text(), result);

    return result;
  });
}
