import type { Atom } from 'atomous'
import type { Object3D } from 'three'
import { batch } from 'atomous'
import saveAs from 'file-saver'
import { STLExporter } from 'three/addons/exporters/STLExporter.js'
import { $enableBlanks, $enableDice } from '~/state/dice'
import { $enableAlign, $enableRender } from '~/state/render'
import { generateFilename } from '../generateFilename'

const exporter = new STLExporter()

function exportObject(object: Object3D | undefined, name: string, extraName?: string) {
  if (!object) return

  object = object.clone()

  object.rotation.x += Math.PI / 2
  object.position.set(0, 0, 0)
  object.updateMatrixWorld(true)

  const result = exporter.parse(object, { binary: true }) as DataView<ArrayBuffer>
  const filename = generateFilename(name, 'stl', extraName)

  saveAs(new Blob([result]), filename)
}

export function exportSTL($object: Pick<Atom<Object3D | undefined>, 'get'>, exportBlanks: boolean, dieName?: string) {
  const enableDice = $enableDice.get()
  const enableBlanks = $enableBlanks.get()
  const enableAlign = $enableAlign.get()
  const enableRender = $enableRender.get()

  const name = exportBlanks
    ? dieName ? 'blank' : 'blanks'
    : dieName ? 'die' : 'dice'

  batch(() => {
    $enableDice.set(!exportBlanks)
    $enableBlanks.set(exportBlanks)
    $enableAlign.set(true)
    $enableRender.set(true)
  })

  exportObject($object.get(), name, dieName)

  batch(() => {
    $enableDice.set(enableDice)
    $enableBlanks.set(enableBlanks)
    $enableAlign.set(enableAlign)
    $enableRender.set(enableRender)
  })
}
