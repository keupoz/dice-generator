import { useComputedColorScheme, useMantineTheme } from '@mantine/core'
import { Grid as DreiGrid } from '@react-three/drei'
import { BackSide } from 'three'
import { useAppState } from '~/appState'

export function Grid() {
  const colorScheme = useComputedColorScheme()
  const { colors } = useMantineTheme()
  const dividerColor = colorScheme === 'dark' ? colors.dark[4] : colors.gray[2]

  const showGrid = useAppState(state => state.showGrid)

  if (!showGrid) {
    return null
  }

  return (
    <DreiGrid
      args={[10, 10]}
      cellSize={1}
      cellThickness={1}
      cellColor={dividerColor}
      sectionSize={10}
      sectionThickness={1.5}
      sectionColor={dividerColor}
      fadeDistance={256}
      infiniteGrid
      side={BackSide}
    />
  )
}
