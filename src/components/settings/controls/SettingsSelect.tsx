import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import { FC, useId } from "react";
import { SettingsRow } from "./SettingsRow";

export interface SettingsSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const SettingsSelect: FC<SettingsSelectProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const id = useId();

  return (
    <SettingsRow label={label} id={id}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="col-span-8 h-8" id={id}>
          <SelectValue placeholder="No value" />
        </SelectTrigger>

        <SelectContent>
          {options.map((item, i) => (
            <SelectItem key={i} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SettingsRow>
  );
};
