import { FC, memo } from "react";
import { SettingsAccordion } from "../../SettingsAccordion";
import { SettingsAccordionItem } from "../../SettingsAccordionItem";
import { SettingsSwitch } from "../../controls/SettingsSwitch";

export interface FontFeaturesProps {
  options: string[];
  values: Record<string, boolean>;
  onChange: (key: string, value: boolean) => void;
}

export const FontFeatures: FC<FontFeaturesProps> = memo(
  ({ options, values, onChange }) => {
    if (!options.length) return null;

    return (
      <SettingsAccordion>
        <SettingsAccordionItem name="Features">
          {options.map((feature) => (
            <SettingsSwitch
              key={feature}
              label={feature}
              checked={values[feature] ?? false}
              onChange={onChange.bind(null, feature)}
            />
          ))}
        </SettingsAccordionItem>
      </SettingsAccordion>
    );
  }
);
