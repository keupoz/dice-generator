import type { DieFaceResult } from '~/dice/utils/createDieFace'
import { Select } from '@mantine/core'
import { objectify } from 'radashi'
import { useMemo } from 'react'
import { useAtom } from '~/atoms/useAtom'
import { $currentDieFace } from '~/state/settings'

export interface DieFacesSelectProps {
  faces: DieFaceResult[]
}

export function DieFaceSelect({ faces }: DieFacesSelectProps) {
  const facesObject = useMemo(() => {
    return objectify(faces, face => face.name)
  }, [faces])

  const currentFace = useAtom($currentDieFace)

  function onChange(value: string | null) {
    if (value === null) return
    $currentDieFace.set(facesObject[value])
  }

  return (
    <Select
      label="Face"
      value={currentFace?.name}
      data={faces.map(face => face.name)}
      onChange={onChange}
    />
  )
}
