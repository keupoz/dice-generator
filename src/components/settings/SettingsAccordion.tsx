import { SettingsSectionContext } from "@/contexts";
import { AccordionGroup } from "@mui/joy";
import { FC, PropsWithChildren, useMemo, useState } from "react";

export const SettingsAccordion: FC<PropsWithChildren> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  const context = useMemo(() => {
    return { currentSection, setCurrentSection };
  }, [currentSection]);

  return (
    <AccordionGroup>
      <SettingsSectionContext.Provider value={context}>
        {children}
      </SettingsSectionContext.Provider>
    </AccordionGroup>
  );
};
