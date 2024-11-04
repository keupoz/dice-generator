import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import { AppDropzone } from './components/AppDropzone'
import { BuiltInFontsProvider } from './contexts/BuiltInFontsContext'
import { CombinedFontsProvider } from './contexts/CombinedFontsContext'
import { CurrentFontsStoreProvider } from './contexts/CurrentFontsStoreContext'
import { EvaluatorProvider } from './contexts/EvaluatorContext'
import { ManifoldProvider } from './contexts/ManifoldContext'
import { theme } from './theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="auto" theme={theme}>
      <ManifoldProvider>
        <EvaluatorProvider>
          <BuiltInFontsProvider>
            <CombinedFontsProvider>
              <CurrentFontsStoreProvider>
                <App />
                <AppDropzone />
              </CurrentFontsStoreProvider>
            </CombinedFontsProvider>
          </BuiltInFontsProvider>
        </EvaluatorProvider>
      </ManifoldProvider>

      <Notifications />
    </MantineProvider>
  </React.StrictMode>,
)
