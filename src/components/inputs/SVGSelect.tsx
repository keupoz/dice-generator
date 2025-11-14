import type { SVGResult } from '~/state/svgs'
import { useAtomValue } from '@atomous/react'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ActionIcon, Menu, MenuDropdown, MenuItem, MenuTarget, TextInput } from '@mantine/core'
import { useMemo } from 'react'
import { $svgs } from '~/state/svgs'

export interface SVGSelectProps {
  label: string
  value: string | SVGResult
  onChange: (value: string | SVGResult) => void
}

export function SVGSelect({ label, value, onChange }: SVGSelectProps) {
  const svgs = useAtomValue($svgs)
  const svgsEntries = useMemo(() => Object.entries(svgs), [svgs])

  const placeholder = typeof value === 'string' ? 'Enter text' : value.fileName ?? 'SVG selected'

  const rightSection = (
    <Menu>
      <MenuTarget>
        <ActionIcon variant="default">
          <FontAwesomeIcon icon={faImage} />
        </ActionIcon>
      </MenuTarget>

      <MenuDropdown>
        {svgsEntries.map(([id, svg]) => (
          <MenuItem key={id} value={id} onClick={() => onChange(svg)}>
            {svg.fileName}
          </MenuItem>
        ))}
      </MenuDropdown>
    </Menu>
  )

  return (
    <TextInput
      label={label}
      value={typeof value === 'string' ? value : ''}
      placeholder={placeholder}
      onChange={e => onChange(e.currentTarget.value)}
      rightSection={svgsEntries.length > 0 && rightSection}
    />
  )
}
