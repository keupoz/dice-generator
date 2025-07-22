import type { ComboboxData } from '@mantine/core'
import type { FormEvent, RefObject } from 'react'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Divider, FileButton, SimpleGrid, TextInput } from '@mantine/core'
import { modals } from '@mantine/modals'
import { AtomSelect } from '~/components/inputs/AtomSelect'
import { AtomSlider } from '~/components/inputs/AtomSlider'
import { AtomSwitch } from '~/components/inputs/AtomSwitch'
import { $diceOutput } from '~/dice/allDice'
import { $enableAlign, $enableRender, $renderEngine, $renderOperation, RenderEngine, RenderOperation } from '~/state/render'
import { $baseOpacity, $enableWireframe, $showGrid, $smoothCamera } from '~/state/viewport'
import { exportSTL } from '~/utils/exporters/exportSTL'
import { handleFiles } from '~/utils/handleFiles'
import { exportPreset } from '~/utils/presets/exportPreset'
import { ThemeSwitcher } from './ThemeSwitcher'

const renderEngines: ComboboxData = Object.entries(RenderEngine).map(([label, value]) => ({ label, value }))
const renderOperations: ComboboxData = Object.entries(RenderOperation).map(([label, value]) => ({ label, value }))

export function GeneralTab() {
  function openExportPresetModal() {
    const inputRef: RefObject<HTMLInputElement | null> = { current: null }

    const modalId = modals.openConfirmModal({
      title: 'Export dice preset',
      children: (
        <form onSubmit={confirm}>
          <TextInput ref={inputRef} required label="Enter preset name" />
        </form>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      closeOnConfirm: false,
      onConfirm: confirm,
    })

    function confirm(e?: FormEvent<HTMLFormElement>) {
      e?.preventDefault()

      const value = inputRef.current?.value
      if (!value) {
        inputRef.current?.focus()
        return
      }
      exportPreset(value)
      modals.close(modalId)
    }
  }

  return (
    <>
      <ThemeSwitcher />

      <FileButton multiple onChange={handleFiles}>
        {props => <Button {...props} variant="default" leftSection={<FontAwesomeIcon icon={faFolderOpen} />}>Open files</Button>}
      </FileButton>

      <AtomSwitch atom={$showGrid} label="Show grid" />
      <AtomSwitch atom={$smoothCamera} label="Smooth camera" />
      <AtomSwitch atom={$enableWireframe} label="Enable wireframe" />
      <AtomSlider atom={$baseOpacity} label="Base opacity" min={0.1} max={1} step={0.1} />

      <Divider />

      <AtomSwitch atom={$enableAlign} label="Enable align" />
      <AtomSwitch atom={$enableRender} label="Enable render" />

      <SimpleGrid cols={2} spacing="xs">
        <AtomSelect atom={$renderEngine} label="Render engine" data={renderEngines} />
        <AtomSelect atom={$renderOperation} label="Render operation" data={renderOperations} />
      </SimpleGrid>

      <SimpleGrid cols={2} spacing="xs">
        <Button onClick={() => exportSTL($diceOutput)}>Export STL</Button>
        <Button onClick={openExportPresetModal}>Export preset</Button>
      </SimpleGrid>
    </>
  )
}
