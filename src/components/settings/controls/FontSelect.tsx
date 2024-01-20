import { getFont } from "@/stores/FontSettingsStore";
import { collectFeatures } from "@/utils/collectFontFeatures";
import { Font, FontVariationSettings } from "fontkit";
import { FC, memo, useCallback, useMemo, useState } from "react";
import { SettingsAccordion } from "../SettingsAccordion";
import { SettingsAccordionItem } from "../SettingsAccordionItem";
import { SettingsSelect } from "./SettingsSelect";
import { SettingsSlider } from "./SettingsSlider";
import { SettingsSwitch } from "./SettingsSwitch";

export interface FontSelectProps {
  name: string;
  options: string[];
  defaultValue: Font;
  features: Record<string, boolean>;
  onFont: (value: Font) => void;
  onFeatures: (value: Record<string, boolean>) => void;
}

function collectVariationSettings(font: Font) {
  const result: FontVariationSettings = {};

  for (const [key, value] of Object.entries(font.variationAxes)) {
    result[key] = value.default;
  }

  return result;
}

export const FontSelect: FC<FontSelectProps> = ({
  name,
  options,
  defaultValue,
  features,
  onFont,
  onFeatures,
}) => {
  const [baseFont, setBaseFont] = useState(defaultValue);

  const defaultVariationSettings = useMemo(() => {
    return collectVariationSettings(defaultValue);
  }, [defaultValue]);

  const [selectedVariation, setSelectedVariation] = useState("Default");
  const [variationSettings, setVariationSettings] =
    useState<FontVariationSettings>(defaultVariationSettings);

  const variations = useMemo(() => {
    return ["Default", ...Object.keys(baseFont.namedVariations)];
  }, [baseFont.namedVariations]);

  function handleBaseChange(fontName: string) {
    const font = getFont(fontName);

    setBaseFont(font);
    setVariationSettings(collectVariationSettings(font));

    onFont(font);
    onFeatures(collectFeatures(font));
  }

  function handleVariationChange(value: string) {
    const variationSettings =
      baseFont.namedVariations[value] ?? defaultVariationSettings;

    setSelectedVariation(value);
    setVariationSettings(variationSettings);
    onFont(baseFont.getVariation(variationSettings));
  }

  function handleAxisChange(key: string, value: number) {
    setVariationSettings((prev) => {
      const newState = { ...prev, [key]: value };
      const font = baseFont.getVariation(newState);

      onFont(font);

      return newState;
    });
  }

  const handleFeatureChange = useCallback(
    (key: string, value: boolean) => {
      onFeatures({ ...features, [key]: value });
    },
    [features, onFeatures]
  );

  return (
    <SettingsAccordionItem name={name}>
      <SettingsSelect
        label="Font"
        options={options}
        value={baseFont.fullName}
        onChange={handleBaseChange}
      />

      {variations.length > 1 && (
        <SettingsSelect
          label="Variation"
          options={variations}
          value={selectedVariation}
          onChange={handleVariationChange}
        />
      )}

      {Object.entries(baseFont.variationAxes).map(([key, value]) => (
        <SettingsSlider
          key={key}
          label={value.name}
          min={value.min}
          max={value.max}
          step={1}
          value={variationSettings[key] ?? value.min}
          onChange={handleAxisChange.bind(null, key)}
        />
      ))}

      <FontFeatures
        options={baseFont.availableFeatures}
        values={features}
        onChange={handleFeatureChange}
      />
    </SettingsAccordionItem>
  );
};

interface FontFeaturesProps {
  options: string[];
  values: Record<string, boolean>;
  onChange: (key: string, value: boolean) => void;
}

const FontFeatures: FC<FontFeaturesProps> = memo(
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
