import {
  BufferAttribute,
  BufferGeometry,
  InterleavedBufferAttribute,
  Mesh,
  Object3D,
  SkinnedMesh,
  Vector3,
} from "three";

export interface STLExporterOptions {
  binary?: boolean;
}

interface CollectedObject {
  object3d: Object3D;
  geometry: BufferGeometry;
}

// Copied from Three.js, because Three.js types are not working
// and three-stdlib doesn't export anything
export class STLExporter {
  public parse(scene: Object3D, options: STLExporterOptions = {}) {
    const binary = options.binary ?? false;

    const objects: CollectedObject[] = [];
    let triangles = 0;

    scene.traverseVisible((object) => {
      if (object instanceof Mesh) {
        const geometry = object.geometry;

        const index = geometry.index;
        const positionAttribute = geometry.getAttribute("position");

        triangles +=
          index === null ? positionAttribute.count / 3 : index.count / 3;

        objects.push({
          object3d: object,
          geometry: geometry,
        });
      }
    });

    let output: DataView | string;
    let offset = 80; // skip header

    if (binary) {
      const bufferLength = triangles * 2 + triangles * 3 * 4 * 4 + 80 + 4;
      const arrayBuffer = new ArrayBuffer(bufferLength);
      output = new DataView(arrayBuffer);
      output.setUint32(offset, triangles, true);
      offset += 4;
    } else {
      output = "";
      output += "solid exported\n";
    }

    const vA = new Vector3();
    const vB = new Vector3();
    const vC = new Vector3();
    const cb = new Vector3();
    const ab = new Vector3();
    const normal = new Vector3();

    for (const object of objects) {
      const index = object.geometry.index;
      const positionAttribute = object.geometry.getAttribute("position");

      if (index !== null) {
        // indexed geometry

        for (let j = 0; j < index.count; j += 3) {
          const a = index.getX(j + 0);
          const b = index.getX(j + 1);
          const c = index.getX(j + 2);

          writeFace(a, b, c, positionAttribute, object.object3d);
        }
      } else {
        // non-indexed geometry

        for (let j = 0; j < positionAttribute.count; j += 3) {
          const a = j + 0;
          const b = j + 1;
          const c = j + 2;

          writeFace(a, b, c, positionAttribute, object.object3d);
        }
      }
    }

    if (binary === false) {
      output += "endsolid exported\n";
    }

    return output;

    function writeFace(
      a: number,
      b: number,
      c: number,
      positionAttribute: BufferAttribute | InterleavedBufferAttribute,
      object: Object3D
    ) {
      vA.fromBufferAttribute(positionAttribute, a);
      vB.fromBufferAttribute(positionAttribute, b);
      vC.fromBufferAttribute(positionAttribute, c);

      if (object instanceof SkinnedMesh) {
        object.applyBoneTransform(a, vA);
        object.applyBoneTransform(b, vB);
        object.applyBoneTransform(c, vC);
      }

      vA.applyMatrix4(object.matrixWorld);
      vB.applyMatrix4(object.matrixWorld);
      vC.applyMatrix4(object.matrixWorld);

      writeNormal(vA, vB, vC);

      writeVertex(vA);
      writeVertex(vB);
      writeVertex(vC);

      if (output instanceof DataView) {
        output.setUint16(offset, 0, true);
        offset += 2;
      } else {
        output += "\t\tendloop\n";
        output += "\tendfacet\n";
      }
    }

    function writeNormal(vA: Vector3, vB: Vector3, vC: Vector3) {
      cb.subVectors(vC, vB);
      ab.subVectors(vA, vB);
      cb.cross(ab).normalize();

      normal.copy(cb).normalize();

      if (output instanceof DataView) {
        output.setFloat32(offset, normal.x, true);
        offset += 4;
        output.setFloat32(offset, normal.y, true);
        offset += 4;
        output.setFloat32(offset, normal.z, true);
        offset += 4;
      } else {
        output += `\tfacet normal ${normal.x} ${normal.y} ${normal.z}\n"`;
        output += "\t\touter loop\n";
      }
    }

    function writeVertex(vertex: Vector3) {
      if (output instanceof DataView) {
        output.setFloat32(offset, vertex.x, true);
        offset += 4;
        output.setFloat32(offset, vertex.y, true);
        offset += 4;
        output.setFloat32(offset, vertex.z, true);
        offset += 4;
      } else {
        output += `\t\t\tvertex ${vertex.x} ${vertex.y} ${vertex.z}\n`;
      }
    }
  }
}
