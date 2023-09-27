import { SettingsSectionContext } from "@/contexts";
import { Accordion, AccordionDetails, AccordionSummary, Stack } from "@mui/joy";
import { FC, PropsWithChildren, useContext } from "react";

export interface SettingsSectionProps {
  name: string;
}

export const SettingsSection: FC<PropsWithChildren<SettingsSectionProps>> = ({
  name,
  children,
}) => {
  const { currentSection, setCurrentSection } = useContext(
    SettingsSectionContext
  );

  return (
    <Accordion
      expanded={currentSection === name}
      onChange={(_e, expanded) => {
        setCurrentSection(expanded ? name : null);
      }}
    >
      <AccordionSummary>{name}</AccordionSummary>
      <AccordionDetails>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          {children}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
