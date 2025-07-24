import type { Object3D } from 'three'
import type { DieInputOptions, DieOptions } from './types'
import { mapValues } from 'radashi'
import { BufferGeometry, Group, Matrix4, Mesh } from 'three'
import { atom } from '~/atoms/atom'
import { computed } from '~/atoms/computed'
import { cad2mesh } from '~/lib/converters/jscad2three'
import { evaluate } from '~/lib/evaluators/evaluate'
import { $extrusionDepth } from '~/state/faces'
import { BASE_MATERIAL, FONT_MATERIAL } from '~/state/materials'
import { $enableAlign, $enableRender, $renderEngine, $renderOperation, RenderOperation } from '~/state/render'
import { strictAt } from '~/utils/array/strictAt'
import { strictFirst } from '~/utils/iterable/strictFirst'
import { createAlignMatrix } from './createAlignMatrix'
import { createDieFace } from './createDieFace'

export type DieResult = ReturnType<typeof createDie>

export function createDie<TInputs extends Record<string, DieInputOptions>>(options: DieOptions<TInputs>) {
  const $inputs = atom(mapValues(options.inputs, item => item.defaultValue))
  const $baseGeom = computed(() => options.buildBase($inputs.get()))

  const { buildFacesBase } = options
  const $facesBaseGeom = buildFacesBase ? computed(() => buildFacesBase($inputs.get())) : $baseGeom

  const $visible = atom(true)
  const $fontScale = atom(options.defaultFontScale ?? 1)
  const $svgScale = atom(options.defaultFontScale ?? 1)

  const faces = options.faces.map(createDieFace.bind(null, $facesBaseGeom, $fontScale, $svgScale))

  const $faceGeoms = computed(() => {
    return faces.map(face => face.instanceAtoms.map(atom => atom.get()))
  })

  const $alignMatrix = computed(() => {
    const result = new Matrix4()

    if (!$enableAlign.get()) return result.makeRotationX(-Math.PI / 2)

    const facesBaseGeom = $facesBaseGeom.get()
    const alignFaceOptions = strictAt(options.faces, -1)
    const alignFaceIndex = strictFirst(alignFaceOptions.instances).faceIndex
    const alignMatrix = createAlignMatrix(facesBaseGeom, alignFaceIndex)

    return result.fromArray(alignMatrix)
  })

  const $finalObject = computed((): Object3D | undefined => {
    if (!$visible.get()) return

    const baseGeom = $baseGeom.get()

    if ($enableRender.get()) {
      const faceGeoms = $faceGeoms.get().flat(2)
      const flatFilteredFaceGeoms = faceGeoms.filter(geom => geom !== undefined)
      return evaluate($renderEngine.get(), baseGeom, flatFilteredFaceGeoms, $renderOperation.get(), `die:${options.name}:evaluated`)
    }

    const baseMesh = cad2mesh(baseGeom, BASE_MATERIAL, `die:${options.name}:base`)
    const faceMeshes = $faceGeoms.get().map((face, faceIndex) => {
      return face.map((geoms) => {
        if (!geoms) return []
        geoms = [geoms].flat()
        return geoms.map((geom, geomIndex) => cad2mesh(geom, FONT_MATERIAL, `die:${options.name}:face:${faceIndex}:${geomIndex}`))
      })
    }).flat(2)

    const result = new Group()
    result.add(baseMesh, ...faceMeshes)

    return result
  }, (object) => {
    object?.traverse((object) => {
      if (object instanceof Mesh && object.geometry instanceof BufferGeometry) {
        object.geometry.dispose()
      }
    })
  })

  const $output = computed(() => {
    const object = $finalObject.get()

    if (!object) return

    const result = new Group()
    const alignMatrix = $alignMatrix.get()

    result.add(object)
    result.applyMatrix4(alignMatrix)

    if ($enableRender.get() && $renderOperation.get() === RenderOperation.Union) {
      const offsetY = $extrusionDepth.get()
      result.position.y += offsetY
    }

    return result
  })

  return {
    name: options.name,
    inputs: options.inputs,
    $visible,
    $fontScale,
    $svgScale,
    $inputs,
    $output,
    faces,
  }
}
