import {
  CssBaseline,
  CssVarsProvider,
  accordionDetailsClasses,
  extendTheme,
  switchClasses,
} from "@mui/joy";
import { Font } from "fontkit";
import { FC } from "react";
import { Scene } from "./Scene/Scene";
import { Settings } from "./settings/Settings";

export interface AppUIProps {
  fonts: Font[];
}

const customTheme = extendTheme({
  components: {
    JoySwitch: {
      defaultProps: {
        sx: {
          [`& .${switchClasses.track}`]: {
            transition: "background-color 0.2s",
          },
          [`& .${switchClasses.thumb}`]: {
            transition: "width 0.2s, left 0.2s",
          },
        },
      },
    },
    JoyAccordion: {
      defaultProps: {
        sx: {
          [`& .${accordionDetailsClasses.content}`]: {
            boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider}`,
            [`&.${accordionDetailsClasses.expanded}`]: {
              paddingBlock: 1,
            },
          },
        },
      },
    },
    JoyAccordionDetails: {
      defaultProps: {
        variant: "soft",
      },
    },
  },
});

export const AppUI: FC<AppUIProps> = ({ fonts }) => {
  return (
    <CssVarsProvider theme={customTheme}>
      <CssBaseline>
        <Settings fonts={fonts} />

        <Scene />
      </CssBaseline>
    </CssVarsProvider>
  );
};
