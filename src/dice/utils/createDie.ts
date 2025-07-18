import type { Object3D } from 'three'
import type { DieInputOptions, DieOptions } from './types'
import mat4 from '@jscad/modeling/src/maths/mat4'
import { align, transform } from '@jscad/modeling/src/operations/transforms'
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
import { strictFirst } from '~/utils/iterable/strictFirst'
import { createDieFace } from './createDieFace'
import { createDieFaceInstance } from './createDieFaceInstance'

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

  effect((get) => {
    const finalObject = get($finalObject)
    return () => {
      finalObject?.traverse((object) => {
        if (object instanceof Mesh && object.geometry instanceof BufferGeometry) {
          object.geometry.dispose()
        }
      })
    }
  })

  const $alignMatrix = computed((get) => {
    let result = mat4.fromXRotation(mat4.create(), -Math.PI / 2)

    if (get($enableAlign)) {
      const facesBaseGeom = get($facesBaseGeom)
      const alignFaceOptions = options.faces[options.alignFaceIndex ?? -1]

      if (alignFaceOptions) {
        const instanceOptions = strictFirst(alignFaceOptions.instances)
        const instance = createDieFaceInstance(facesBaseGeom, instanceOptions, options.invertAlignMatrix)

        result = mat4.multiply(mat4.create(), result, instance.rotationMatrix)
      }

      const offsetY = get($renderOperation) === RenderOperation.Union ? get($extrusionDepth) : 0
      const transformedGeom = transform(result, facesBaseGeom)
      const alignment = align({ modes: ['none', 'min', 'none'], relativeTo: [null, offsetY, null], grouped: true }, transformedGeom).transforms
      result = mat4.multiply(mat4.create(), alignment, result)
    }

    return new Matrix4().fromArray(result)
  })

  const $output = computed((get) => {
    const object = get($finalObject)
    const alignMatrix = get($alignMatrix)

    if (!object) return object

    const result = new Group()
    result.add(object)
    result.applyMatrix4(alignMatrix)

    return result
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
