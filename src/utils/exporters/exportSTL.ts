import type { Object3D } from 'three'
import type { ReadableAtom } from '~/atoms/types'
import saveAs from 'file-saver'
import { STLExporter } from 'three/addons/exporters/STLExporter.js'
import { flush } from '~/atoms/scheduler'
import { $enableAlign, $enableRender } from '~/state/render'
import { generateFilename } from '../generateFilename'

const exporter = new STLExporter()

function exportObject(object: Object3D | undefined, name?: string) {
  if (!object) return

  object = object.clone()

  object.rotation.x = Math.PI / 2
  object.position.set(0, 0, 0)
  object.updateWorldMatrix(true, true)

  const result = exporter.parse(object, { binary: true })
  const filename = generateFilename('dice', 'stl', name)

  saveAs(new Blob([result]), filename)
}

export function exportSTL($object: ReadableAtom<Object3D | undefined>, name?: string) {
  const enableAlign = $enableAlign.get()
  const enableRender = $enableRender.get()

  $enableAlign.set(true)
  $enableRender.set(true)

  flush()
  exportObject($object.get(), name)

  $enableAlign.set(enableAlign)
  $enableRender.set(enableRender)
}
