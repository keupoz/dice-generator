import { Grid as DreiGrid } from '@keupoz/r3f-utils'
import { useComputedColorScheme, useMantineTheme } from '@mantine/core'

export function Grid() {
  const colorScheme = useComputedColorScheme()
  const { colors } = useMantineTheme()
  const color = colorScheme === 'dark' ? colors.dark[5] : colors.gray[4]

  return <DreiGrid color={color} />
}
