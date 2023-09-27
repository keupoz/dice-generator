import vec3 from "@jscad/modeling/src/maths/vec3";
import { measureBoundingSphere } from "@jscad/modeling/src/measurements";
import { scale } from "@jscad/modeling/src/operations/transforms";
import { polyhedron, PolyhedronOptions } from "@jscad/modeling/src/primitives";

export function defineScaledPolyhedron(options: PolyhedronOptions) {
  const geom = polyhedron(options);
  const [, circumscribedRadius] = measureBoundingSphere(geom);

  return (radius: number) => {
    const s = vec3.fromScalar(vec3.create(), radius / circumscribedRadius);

    return scale(s, geom);
  };
}
