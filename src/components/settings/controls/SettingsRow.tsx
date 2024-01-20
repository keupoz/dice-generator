import { Label } from "@/shadcn/components/ui/label";
import { FC, PropsWithChildren } from "react";

export interface SettingsRowProps {
  label: string;
  id: string;
  wideLabel?: boolean;
}

export const SettingsRow: FC<PropsWithChildren<SettingsRowProps>> = ({
  label,
  id,
  wideLabel,
  children,
}) => {
  return (
    <div className="grid grid-cols-12 gap-2 items-center h-8">
      <Label className={wideLabel ? "col-span-10" : "col-span-4"} htmlFor={id}>
        {label}
      </Label>

      {children}
    </div>
  );
};
