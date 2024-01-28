import { Glyph } from "fontkit";
import { BufferGeometry, Path } from "three";
import { glyph2paths } from "./glypth2paths";
import { paths2geometry } from "./paths2geometry";

export interface GlyphCache {
  segments: number;
  paths: Path[];
  geometry: BufferGeometry;
}

const cacheMap = new WeakMap<Glyph, GlyphCache>();

export function getGlyphGeometry(glyph: Glyph, segments: number) {
  let cache = cacheMap.get(glyph);

  if (cache === undefined || cache.segments !== segments) {
    const paths = cache?.paths ?? glyph2paths(glyph);

    cache = {
      segments,
      paths,
      geometry: paths2geometry(paths, segments),
    };

    cacheMap.set(glyph, cache);
  }

  return cache.geometry;
}
