import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shadcn/components/ui/accordion";
import { FC, PropsWithChildren } from "react";

export interface SettingsAccordionItemProps {
  name: string;
}

export const SettingsAccordionItem: FC<
  PropsWithChildren<SettingsAccordionItemProps>
> = ({ name, children }) => {
  return (
    <AccordionItem value={name} className="last:border-b-0">
      <AccordionTrigger className="h-8">{name}</AccordionTrigger>
      <AccordionContent className="py-2 border-t flex flex-col gap-2">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};
