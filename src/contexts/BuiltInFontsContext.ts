import { Buffer } from 'node:buffer'
import { create as createFont, type Font } from 'fontkit'
import { useEffect, useState } from 'react'
import { createContext } from '~/utils/createContext'
import { flatFontCollection } from '~/utils/flatFontCollection'

const LOCAL_FONTS = import.meta.glob('~/assets/fonts/*', {
  eager: true,
  as: 'url',
})

const FONTS = [
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

  ...Object.values(LOCAL_FONTS),
]

const UNMOUNT_REASON = 'UNMOUNT_REASON'

export const { useBuiltInFonts, BuiltInFontsProvider } = createContext('BuiltInFonts', () => {
  const [fonts, setFonts] = useState<Font[] | null>(null)

  useEffect(() => {
    const abortController = new AbortController()

    const promises = FONTS.map(async (url) => {
      const r = await fetch(url, { signal: abortController.signal })
      const arrayBuffer = await r.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const fontCollection = createFont(buffer)

      return fontCollection
    })

    Promise.all(promises).then((fontCollections) => {
      const flatFonts = flatFontCollection(fontCollections)

      setFonts(flatFonts)
    }).catch((error) => {
      if (error !== UNMOUNT_REASON) {
        throw error
      }
    })

    return () => abortController.abort(UNMOUNT_REASON)
  }, [])

  return fonts
})
