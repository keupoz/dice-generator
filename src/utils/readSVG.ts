import { SVGLoader } from 'three/addons/loaders/SVGLoader.js'
import type { SVGInfo } from '~/appState'
import { readTextFile } from './readTextFile'

let lastId = 0

export async function readSVG(file: File): Promise<SVGInfo> {
  const raw = await readTextFile(file)

  const loader = new SVGLoader()
  const data = loader.parse(raw)

  const paths = data.paths.flatMap(path => path.subPaths)

  let viewboxScale: number | null = null

  if ('viewBox' in data.xml && data.xml.viewBox instanceof SVGAnimatedRect) {
    const { x, y, width, height } = data.xml.viewBox.baseVal

    viewboxScale = 1 / Math.max(width - x, height - y)
  }

  return {
    id: lastId++,
    name: file.name,
    lastModified: file.lastModified,
    fileSize: file.size,
    raw,
    paths,
    scaleByViewbox: true,
    viewboxScale,
  }
}
