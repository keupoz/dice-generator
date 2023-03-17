import { MeshLambertMaterial, MeshNormalMaterial } from "three";

export const BASE_MATERIAL = new MeshLambertMaterial({
  transparent: true,
  opacity: 0.9,
});

export const FONT_MATERIAL = new MeshNormalMaterial();
