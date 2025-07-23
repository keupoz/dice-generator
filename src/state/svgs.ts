import type { Geom3 } from '@jscad/modeling/src/geometries/types'
import type { Path } from 'three'
import type { SVGResult as ThreeSVGResult } from 'three/addons/loaders/SVGLoader.js'
import type { ReadableAtom, WritableAtom } from '~/atoms/types'
import { measureDimensions } from '@jscad/modeling/src/measurements'
import { mirrorY, scale } from '@jscad/modeling/src/operations/transforms'
import { objectify } from 'radashi'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js'
import { atom } from '~/atoms/atom'
import { computed } from '~/atoms/computed'
import { getSVGGeometry } from '~/lib/fonts/getSVGGeometry'
import { $segments } from './faces'

export interface SVGResult {
  id: string
  fileName: string
  lastModified: number
  fileSize: number
  raw: string
  paths: Path[]
  viewboxScale: number | null
  $scaleByViewBox: WritableAtom<boolean>
  $geom: ReadableAtom<Geom3>
}

export const $svgs = atom<Record<string, SVGResult>>({})
export const $svgScale = atom(0.75)

function readViewboxScale(data: ThreeSVGResult) {
  if (!('viewBox' in data.xml && data.xml.viewBox instanceof SVGAnimatedRect)) return null

  const { x, y, width, height } = data.xml.viewBox.baseVal

  return 1 / Math.max(width - x, height - y)
}

export async function loadSVGs(files: File[]) {
  const promises = files.map(async (file) => {
    const raw = await file.text()
    const loader = new SVGLoader()
    const data = loader.parse(raw)

    const paths = data.paths.flatMap(path => path.subPaths)
    const viewboxScale = readViewboxScale(data)
    const $scaleByViewBox = atom(true)

    const result: SVGResult = {
      id: `${file.lastModified}_${file.name}`,
      fileName: file.name,
      lastModified: file.lastModified,
      fileSize: file.size,
      raw,
      paths,
      viewboxScale,
      $scaleByViewBox,
      $geom: computed(() => {
        const scaleByViewBox = $scaleByViewBox.get()
        const segments = $segments.get()

        let geom = getSVGGeometry(paths, segments)
        const [width, height] = measureDimensions(geom)
        const vbScale = scaleByViewBox ? viewboxScale : null
        const geomScale = vbScale ?? (1 / Math.max(width, height))

        geom = scale([geomScale, geomScale], geom)
        geom = mirrorY(geom)

        return geom
      }),
    }

    return result
  })

  const awaitedPromises = await Promise.all(promises)
  const svgs = objectify(awaitedPromises, svg => svg.id)
  $svgs.set({ ...$svgs.get(), ...svgs })
}
