import type { PropsWithChildren } from 'react'
import { useAtomValue } from '@atomous/react'
import { Alert, Center, Loader } from '@mantine/core'
import { $resources } from '~/state/resources'

export function AppLoader({ children }: PropsWithChildren) {
  const resources = useAtomValue($resources)

  let content
  let error

  switch (resources.status) {
    case 'success': return children

    case 'loading': {
      content = <Loader />
      break
    }

    case 'aborted': {
      error = 'Aborted'
      break
    }

    case 'error': {
      error = resources.error ? String(resources.error) : undefined
      break
    }
  }

  content ??= <Alert color="red" title={error ?? 'Unknown error'} onClose={$resources.reset} />

  return <Center h="100dvh">{content}</Center>
}
