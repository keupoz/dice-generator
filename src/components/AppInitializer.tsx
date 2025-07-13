import type { PropsWithChildren } from 'react'
import { Alert, Center, Loader } from '@mantine/core'
import { useEffect, useState } from 'react'
import { initManifold } from '~/lib/manifold/instance'
import { fetchFonts } from '~/state/fonts'

const LOCAL_FONTS = import.meta.glob<string>('/src/assets/fonts/*', {
  query: '?url',
  import: 'default',
  eager: true,
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

const promises = Promise.all([
  fetchFonts(FONTS, 'Roboto'),
  initManifold(),
])

type State = {
  status: 'success'
} | {
  status: 'pending'
} | {
  status: 'error'
  error: unknown
}

export function AppInitializer({ children }: PropsWithChildren) {
  const [state, setState] = useState<State>({ status: 'pending' })

  useEffect(() => {
    let active = true

    promises
      .then(() => active && setState({ status: 'success' }))
      .catch(error => active && setState({ status: 'error', error }))

    return () => {
      active = false
    }
  }, [])

  switch (state.status) {
    case 'pending': return (
      <Center h="100dvh">
        <Loader />
      </Center>
    )
    case 'error':return (
      <Center h="100dvh">
        <Alert color="red" title={String(state.error)} />
      </Center>
    )
    case 'success': return children
  }
}
