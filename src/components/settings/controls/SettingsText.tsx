import { Input } from "@/shadcn/components/ui/input";
import { FC, useId } from "react";
import { SettingsRow } from "./SettingsRow";

export interface SettingsTextProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const SettingsText: FC<SettingsTextProps> = ({
  label,
  value,
  onChange,
}) => {
  const id = useId();

  return (
    <SettingsRow label={label} id={id}>
      <Input
        className="col-span-8 h-8"
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </SettingsRow>
  );
};
