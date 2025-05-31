import type { Object3D } from 'three'
import saveAs from 'file-saver'
import { BinarySTLWriter, STLExporter } from '~/STLExporter'
import { generateFilename } from '../generateFilename'

const exporter = new STLExporter(BinarySTLWriter)

export function exportSTL(object: Object3D, name?: string) {
  object = object.clone()

  object.rotation.set(Math.PI / 2, 0, 0)
  object.position.set(0, 0, 0)
  object.updateWorldMatrix(true, true)

  const result = exporter.parse(object)
  const filename = generateFilename('dice', 'stl', name)

  saveAs(new Blob([result]), filename)
}
