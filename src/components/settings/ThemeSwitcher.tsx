import { faLaptop, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SegmentedControl, type SegmentedControlProps, Tooltip, useMantineColorScheme } from '@mantine/core'

export function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useMantineColorScheme({ keepTransitions: true })

  return (
    <Tooltip label="Color theme">
      <SegmentedControl
        fullWidth
        data={[
          { value: 'light', label: <FontAwesomeIcon icon={faSun} /> },
          { value: 'dark', label: <FontAwesomeIcon icon={faMoon} /> },
          { value: 'auto', label: <FontAwesomeIcon icon={faLaptop} /> },
        ]}
        value={colorScheme}
        onChange={setColorScheme as SegmentedControlProps['onChange']}
      />
    </Tooltip>
  )
}
