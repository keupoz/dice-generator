import { SVGInfo } from "@/stores/FontSettingsStore";
import { BufferGeometry } from "three";
import { paths2geometry } from "./paths2geometry";

export interface SVGCache {
  segments: number;
  geometry: BufferGeometry;
}

const cacheMap = new WeakMap<SVGInfo, SVGCache>();

export function getSVGGeometry(svg: SVGInfo, segments: number) {
  let cache = cacheMap.get(svg);

  if (cache === undefined || cache.segments !== segments) {
    cache = {
      segments,
      geometry: paths2geometry(svg.paths, segments),
    };

    cacheMap.set(svg, cache);
  }

  return cache.geometry;
}
