import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'
import { theme } from './theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="auto" theme={theme}>
      <App />
      <Notifications />
    </MantineProvider>
  </React.StrictMode>,
)
