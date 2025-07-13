import type { DieFaceResult } from '~/dice/utils/createDieFace'
import { Select, Text } from '@mantine/core'
import { objectify } from 'radashi'
import { useMemo, useState } from 'react'
import { DieFaceSettings } from './DieFaceSettings'

export interface DieFacesSettingsProps {
  faces: DieFaceResult[]
}

export function DieFacesSettings({ faces }: DieFacesSettingsProps) {
  const facesObject = useMemo(() => {
    return objectify(faces, face => face.name)
  }, [faces])

  const [currentFaceName, setCurrentFaceName] = useState(faces[0]?.name)
  const currentFace = currentFaceName ? facesObject[currentFaceName] : undefined

  function onChange(value: string | null) {
    if (value === null) return
    setCurrentFaceName(value)
  }

  return (
    <>
      <Select
        label="Face"
        value={currentFace?.name}
        data={faces.map(face => face.name)}
        onChange={onChange}
      />

      {currentFace
        ? <DieFaceSettings face={currentFace} />
        : <Text c="dimmed" ta="center">No face selected</Text>}
    </>
  )
}
