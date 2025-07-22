import type { Object3D } from 'three'
import type { DieInputOptions, DieOptions } from './types'
import mat4 from '@jscad/modeling/src/maths/mat4'
import { mapValues } from 'radashi'
import { BufferGeometry, Group, Matrix4, Mesh } from 'three'
import { atom } from '~/atoms/atom'
import { computed } from '~/atoms/computed'
import { effect } from '~/atoms/effect'
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
  const $baseGeom = computed(get => options.buildBase(get($inputs)))

  const { buildFacesBase } = options
  const $facesBaseGeom = buildFacesBase ? computed(get => buildFacesBase(get($inputs))) : $baseGeom

  const $visible = atom(true)
  const $fontScale = atom(options.defaultFontScale ?? 1)

  const faces = options.faces.map(createDieFace.bind(null, $facesBaseGeom, $fontScale))

  const $faceGeoms = computed((get) => {
    return faces.map(face => face.instanceAtoms.map(atom => get(atom)))
  })

  const $alignMatrix = computed((get) => {
    if (!get($enableAlign)) return undefined

    const facesBaseGeom = get($facesBaseGeom)
    const alignFaceOptions = strictAt(options.faces, -1)
    const alignFaceIndex = strictFirst(alignFaceOptions.instances).faceIndex
    const result = createAlignMatrix(facesBaseGeom, alignFaceIndex)

    if (get($enableRender) && get($renderOperation) === RenderOperation.Union) {
      const offsetY = get($extrusionDepth)
      mat4.translate(result, result, [0, offsetY, 0])
    }

    return new Matrix4().fromArray(result)
  })

  const $finalObject = computed((get): Object3D | undefined => {
    if (!get($visible)) return

    const baseGeom = get($baseGeom)

    if (get($enableRender)) {
      const faceGeoms = get($faceGeoms).flat(2)
      const flatFilteredFaceGeoms = faceGeoms.filter(geom => geom !== undefined)
      return evaluate(get($renderEngine), baseGeom, flatFilteredFaceGeoms, get($renderOperation), `die:${options.name}:evaluated`)
    }

    const baseMesh = cad2mesh(baseGeom, BASE_MATERIAL, `die:${options.name}:base`)
    const faceMeshes = get($faceGeoms).map((face, faceIndex) => {
      return face.map((geoms) => {
        if (!geoms) return []
        geoms = [geoms].flat()
        return geoms.map((geom, geomIndex) => cad2mesh(geom, FONT_MATERIAL, `die:${options.name}:face:${faceIndex}:${geomIndex}`))
      })
    }).flat(2)

    const result = new Group()
    result.add(baseMesh, ...faceMeshes)

    return result
  })

  const $output = computed((get) => {
    const object = get($finalObject)

    if (!object) return

    const alignMatrix = get($alignMatrix)

    if (!alignMatrix) return object

    const result = new Group()
    result.add(object)
    result.applyMatrix4(alignMatrix)

    return result
  })

  effect((get) => {
    const object = get($finalObject)

    return () => {
      object?.traverse((object) => {
        if (object instanceof Mesh && object.geometry instanceof BufferGeometry) {
          object.geometry.dispose()
        }
      })
    }
  })

  return {
    name: options.name,
    inputs: options.inputs,
    $visible,
    $fontScale,
    $inputs,
    $output,
    faces,
  }
}
