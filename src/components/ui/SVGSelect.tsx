import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Menu, TextInput } from '@mantine/core'
import { useMemo } from 'react'
import { useAppState } from '~/appState'

export interface SVGSelectProps {
  label: string
  value: string | number
  onChange: (value: string | number) => void
}

export function SVGSelect({ label, value, onChange }: SVGSelectProps) {
  const svgs = useAppState(state => state.userSVGs)

  const placeholder = useMemo(() => {
    if (typeof value === 'string') {
      return 'Enter text'
    }

    return svgs.find(svg => svg.id === value)?.name ?? 'SVG selected'
  }, [svgs, value])

  const rightSection = (
    <Menu>
      <Menu.Target>
        <ActionIcon variant="default">
          <FontAwesomeIcon icon={faImage} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {svgs.map(item => (
          <Menu.Item key={item.id} value={item.id.toString()} onClick={() => onChange(item.id)}>
            {item.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )

  const variant2 = (
    <TextInput
      label={label}
      value={typeof value === 'number' ? '' : value}
      placeholder={placeholder}
      onChange={e => onChange(e.currentTarget.value)}
      rightSection={svgs.length > 0 && rightSection}
    />
  )

  return variant2
}
