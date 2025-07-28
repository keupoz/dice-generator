import type { Object3D } from 'three'
import type { DieInputOptions, DieOptions } from './types'
import mat4 from '@jscad/modeling/src/maths/mat4'
import { mapValues } from 'radashi'
import { BufferGeometry, Group, Matrix4, Mesh } from 'three'
import { atom } from '~/atoms/atom'
import { computed } from '~/atoms/computed'
import { cad2mesh } from '~/lib/converters/jscad2three'
import { evaluate } from '~/lib/evaluators/evaluate'
import { $blanksDelta, $enableBlanks, $enableDice } from '~/state/dice'
import { $extrusionDepth } from '~/state/faces'
import { BASE_MATERIAL, BLANK_MATERIAL, FONT_MATERIAL } from '~/state/materials'
import { $enableAlign, $enableRender, $renderEngine, $renderOperation, RenderOperation } from '~/state/render'
import { strictAt } from '~/utils/array/strictAt'
import { strictFirst } from '~/utils/iterable/strictFirst'
import { createBlank } from './createBlank'
import { createDieFace } from './createDieFace'
import { makeAlignmentMatrix } from './makeAlignmentMatrix'

export type DieResult = ReturnType<typeof createDie>

function cleanupObject(object: Object3D | undefined) {
  object?.traverse((object) => {
    if (object instanceof Mesh && object.geometry instanceof BufferGeometry) {
      object.geometry.dispose()
    }
  })
}

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

  const $blankObject = computed<Object3D | undefined>(() => {
    if (!$visible.get() || !$enableBlanks.get()) return

    const delta = $blanksDelta.get()
    const baseGeom = $baseGeom.get()
    const blankGeom = createBlank(baseGeom, delta)

    return cad2mesh(blankGeom, BLANK_MATERIAL, `die:${options.name}:blank`)
  }, cleanupObject)

  const $dieObject = computed<Object3D | undefined>(() => {
    if (!$visible.get() || !$enableDice.get()) return

    const baseGeom = $baseGeom.get()

    if ($enableRender.get()) {
      const faceGeoms = $faceGeoms.get().flat(2)
      const flatFilteredFaceGeoms = faceGeoms.filter(geom => geom !== undefined)
      const evaluated = evaluate($renderEngine.get(), baseGeom, flatFilteredFaceGeoms, $renderOperation.get(), `die:${options.name}:evaluated`)

      return evaluated
    }

    const objects: Object3D[] = []

    // Base mesh
    objects.push(cad2mesh(baseGeom, BASE_MATERIAL, `die:${options.name}:base`))

    // Face meshes
    $faceGeoms.get().forEach((face, faceIndex) => {
      face.forEach((geoms) => {
        if (!geoms) return

        // It's not guaranteed that geoms is an array
        [geoms].flat().forEach((geom, geomIndex) => {
          objects.push(cad2mesh(geom, FONT_MATERIAL, `die:${options.name}:face:${faceIndex}:${geomIndex}`))
        })
      })
    })

    const result = new Group()
    result.add(...objects)

    return result
  }, cleanupObject)

  const $alignMatrix = computed(() => {
    const out = mat4.create()

    if ($enableAlign.get()) {
      const facesBaseGeom = $facesBaseGeom.get()
      const alignFaceOptions = strictAt(options.faces, -1)
      const alignFaceIndex = strictFirst(alignFaceOptions.instances).faceIndex

      makeAlignmentMatrix(out, facesBaseGeom, alignFaceIndex)

      if (!$enableDice.get() && $enableBlanks.get()) {
        const translation = mat4.fromTranslation(mat4.create(), [0, -$blanksDelta.get(), 0])
        mat4.multiply(out, translation, out)
      }
    } else {
      mat4.rotateX(out, out, -Math.PI / 2)
    }

    return new Matrix4().fromArray(out)
  })

  const $finalObject = computed<Object3D | undefined>(() => {
    const objects: Object3D[] = []

    const dieObject = $dieObject.get()
    const blankObject = $blankObject.get()

    if (dieObject) objects.push(dieObject)
    if (blankObject) objects.push(blankObject)

    if (!objects.length) return

    const result = new Group()
    result.add(...objects)

    return result
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
