import type { Font } from 'fontkit'
import type { FontResult } from '../fonts'
import type { FixedFont } from '~/lib/fontkit'
import { Buffer } from 'node:buffer'
import { create } from 'fontkit'

function getFonts() {
  const localFonts = import.meta.glob<string>('/src/assets/fonts/*', {
    query: '?url',
    import: 'default',
    eager: true,
  })

  return [
  // Roboto Regular
    'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf',

    // Roboto SLab
    'https://fonts.gstatic.com/s/robotoslab/v24/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISWaG5iddG-1A.ttf',

    // Lobster
    'https://fonts.gstatic.com/s/lobster/v28/neILzCirqoswsqX9_oWsMqEzSJQ.ttf',

    // Righteous
    'https://fonts.gstatic.com/s/righteous/v13/1cXxaUPXBpj2rGoU7C9mj3uEicG01A.ttf',

    // Edu NSW ACT Foundation
    'https://fonts.gstatic.com/s/edunswactfoundation/v2/raxRHjqJtsNBFUi8WO0vUBgc9D-2lV_oQdCAYlt_QTQ0vUxJki9tovGLeC-sfguJ.ttf',

    // Material Symbols Rounded
    'https://fonts.gstatic.com/s/materialsymbolsrounded/v106/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDJ_vb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOc7TOVpeRL2w5rwZu2rIelXxc.woff2',

    ...Object.values(localFonts),
  ]
}

function getFontName(font: Font) {
  return font.fullName
}

function readFonts(arrayBuffers: ArrayBuffer[]) {
  const fonts: Record<string, FontResult> = {}

  for (const arrayBuffer of arrayBuffers) {
    const font = create(Buffer.from(arrayBuffer))

    if ('fonts' in font) {
      for (const item of font.fonts) {
        const name = getFontName(item)
        fonts[name] = { name, value: item as FixedFont }
      }
    } else {
      const name = getFontName(font)
      fonts[name] = { name, value: font as FixedFont }
    }
  }

  return fonts
}

export async function fetchFonts() {
  const promises = getFonts().map(async (url) => {
    const r = await fetch(url)
    const arrayBuffer = await r.arrayBuffer()
    return arrayBuffer
  })

  const arrayBuffers = await Promise.all(promises)

  return readFonts(arrayBuffers)
}
