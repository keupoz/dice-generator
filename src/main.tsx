import { AppShellAside, AppShellMain, MantineProvider, ScrollArea } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppLoader } from './components/AppLoader'
import { AppShell } from './components/AppShell'
import { AppDropzone } from './components/dropzone/AppDropzone'
import { Scene } from './components/scene/Scene'
import { Settings } from './components/settings/Settings'
import { theme } from './theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <ModalsProvider>
        <AppShell>
          <AppLoader>
            <AppShellAside>
              <ScrollArea>
                <Settings />
              </ScrollArea>
            </AppShellAside>

            <AppShellMain h="100dvh">
              <Scene />
            </AppShellMain>
          </AppLoader>
        </AppShell>

        <Notifications />
        <AppDropzone />
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>,
)
