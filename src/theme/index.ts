import { createTheme, Select, Switch, TabsList } from '@mantine/core'
import SelectClassNames from './styles/Select.module.scss'
import SwitchClassNames from './styles/Switch.module.scss'
import '@mantine/core/styles.css'
import './styles/main.scss'

export const theme = createTheme({
  components: {
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
      },
    }),

    TabsList: TabsList.extend({
      defaultProps: {
        grow: true,
      },
    }),
  },
})
