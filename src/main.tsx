import { AppShellAside, AppShellMain, MantineProvider, ScrollArea } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppInitializer } from './components/AppInitializer'
import { AppShell } from './components/AppShell'
import { AppDropzone } from './components/dropzone/AppDropzone'
import { Scene } from './components/scene/Scene'
import { Settings } from './components/settings/Settings'
import { theme } from './theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <AppShell>
        <AppInitializer>
          <AppShellAside>
            <ScrollArea>
              <Settings />
            </ScrollArea>
          </AppShellAside>

          <AppShellMain h="100dvh">
            <Scene />
          </AppShellMain>
        </AppInitializer>
      </AppShell>

      <Notifications />
      <AppDropzone />
    </MantineProvider>
  </StrictMode>,
)
