import { Input } from "@/shadcn/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/shadcn/components/ui/select";
import { useFontsStore } from "@/stores/FontSettingsStore";
import { FC, useId, useMemo } from "react";
import { SettingsRow } from "./SettingsRow";

export interface SettingsSVGSelectProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
}

export const SettingsSVGSelect: FC<SettingsSVGSelectProps> = ({
  label,
  value,
  onChange,
}) => {
  const id = useId();

  const svgs = useFontsStore((state) => state.svgs);

  const placeholder = useMemo(() => {
    if (typeof value === "string") return "Enter text";

    return svgs.find((svg) => svg.id === value)?.name ?? "SVG selected";
  }, [svgs, value]);

  return (
    <SettingsRow label={label} id={id}>
      <Input
        className="col-span-6 h-8"
        id={id}
        type="text"
        value={typeof value === "number" ? "" : value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.currentTarget.value)}
      />

      <Select
        value={typeof value === "number" ? value.toString() : "-1"}
        onValueChange={(value) => onChange(parseInt(value))}
      >
        <SelectTrigger className="col-span-2 h-8" />

        <SelectContent>
          {svgs.length === 0 ? (
            <SelectItem value="None" disabled>
              No SVGs loaded
            </SelectItem>
          ) : (
            svgs.map((item, i) => (
              <SelectItem key={i} value={item.id.toString()}>
                {item.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </SettingsRow>
  );
};
