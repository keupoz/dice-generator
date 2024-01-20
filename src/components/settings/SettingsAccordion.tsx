import { Accordion } from "@/shadcn/components/ui/accordion";
import { FC, PropsWithChildren } from "react";

export const SettingsAccordion: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {children}
    </Accordion>
  );
};
