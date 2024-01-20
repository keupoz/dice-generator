import { STLExporter } from "@/STLExporter";
import saveAs from "file-saver";
import { Object3D } from "three";

export function exportSTL(object: Object3D, name?: string) {
  object = object.clone();

  object.rotation.set(-Math.PI / 2, 0, 0);
  object.position.set(0, 0, 0);
  object.updateWorldMatrix(true, true);

  const exporter = new STLExporter();
  const result = exporter.parse(object, {
    binary: true,
  });

  const date = new Date();

  let timestamp = `${date.getFullYear()}`.padStart(4, "0");
  timestamp += "-" + `${date.getMonth()}`.padStart(2, "0");
  timestamp += "-" + `${date.getDate()}`.padStart(2, "0");
  timestamp += "_" + `${date.getHours()}`.padStart(2, "0");
  timestamp += "-" + `${date.getMinutes()}`.padStart(2, "0");
  timestamp += "-" + `${date.getSeconds()}`.padStart(2, "0");

  let filename = `dice-${timestamp}.stl`;

  if (name) {
    filename = `dice-${name}-${timestamp}.stl`;
  }

  saveAs(new Blob([result]), filename);
}
