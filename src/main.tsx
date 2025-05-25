import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import { AppDropzone } from './components/AppDropzone'
import { AppProvider } from './providers/app/AppProvider'
import { CombinedFontsProvider } from './providers/CombinedFontsProvider'
import { theme } from './theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="auto" theme={theme}>
      <AppProvider>
        <CombinedFontsProvider>
          <App />
          <AppDropzone />
          <Notifications />
        </CombinedFontsProvider>
      </AppProvider>
    </MantineProvider>
  </StrictMode>,
)
