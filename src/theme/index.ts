import { createTheme, Popover, ScrollArea, Select, Switch } from '@mantine/core'
import SelectClassNames from './Select.module.scss'
import SwitchClassNames from './Switch.module.scss'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dropzone/styles.css'
import './main.scss'

export const theme = createTheme({
  components: {
    Popover: Popover.extend({
      defaultProps: {
        shadow: 'sm',
      },
    }),

    ScrollArea: ScrollArea.extend({
      defaultProps: {
        scrollbarSize: 8,
      },
    }),

    Select: Select.extend({
      classNames: SelectClassNames,
      defaultProps: {
        withCheckIcon: false,
      },
    }),

    Switch: Switch.extend({
      classNames: SwitchClassNames,
      defaultProps: {
        labelPosition: 'left',
        my: 2,
      },
    }),
  },
})
