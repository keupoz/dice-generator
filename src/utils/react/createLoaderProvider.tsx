import type { PropsWithChildren } from 'react'
import { Alert, Center, Loader } from '@mantine/core'
import { useEffect, useState } from 'react'
import { createSafeContext } from './createSafeContext'

type LoaderState<T> = {
  status: 'pending'
} | {
  status: 'error'
  error: unknown
} | {
  status: 'success'
  data: T
}

const UNMOUNT_REASON = Symbol('Rejected by component unmount')

export function createLoaderProvider<T>(loader: (signal: AbortSignal) => Promise<T>) {
  const [Context, useContext] = createSafeContext<T>()

  function Provider({ children }: PropsWithChildren) {
    const [state, setState] = useState<LoaderState<T>>({ status: 'pending' })

    useEffect(() => {
      const abortController = new AbortController()

      loader(abortController.signal)
        .then(data => setState({ status: 'success', data }))
        .catch((error) => {
          if (error !== UNMOUNT_REASON) setState({ status: 'error', error })
        })

      return () => {
        abortController.abort(UNMOUNT_REASON)
        setState({ status: 'pending' })
      }
    }, [])

    switch (state.status) {
      case 'pending': return (
        <Center h="100dvh">
          <Loader />
        </Center>
      )
      case 'error': return <Alert color="red" title={String(state.error)} />
      case 'success': return <Context value={state.data}>{children}</Context>
    }
  }

  return [Provider, useContext] as const
}
