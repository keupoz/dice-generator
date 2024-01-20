import { Switch } from "@/shadcn/components/ui/switch";
import { FC, useId } from "react";
import { SettingsRow } from "./SettingsRow";

export interface SettingsSwitchProps {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const SettingsSwitch: FC<SettingsSwitchProps> = ({
  label,
  checked,
  onChange,
}) => {
  const id = useId();

  return (
    <SettingsRow label={label} id={id} wideLabel>
      <Switch
        className="col-span-2"
        id={id}
        checked={checked}
        onCheckedChange={(value) => onChange(value)}
      />
    </SettingsRow>
  );
};
