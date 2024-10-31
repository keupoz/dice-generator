import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import { AppDropzone } from './components/AppDropzone'
import { BuiltInFontsProvider } from './contexts/BuiltInFontsContext'
import { CombinedFontsProvider } from './contexts/CombinedFontsContext'
import { CurrentFontsStoreProvider } from './contexts/CurrentFontsStoreContext'
import { theme } from './theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="auto" theme={theme}>
      <BuiltInFontsProvider>
        <CombinedFontsProvider>
          <CurrentFontsStoreProvider>
            <App />
            <AppDropzone />
          </CurrentFontsStoreProvider>
        </CombinedFontsProvider>
      </BuiltInFontsProvider>

      <Notifications />
    </MantineProvider>
  </React.StrictMode>,
)
