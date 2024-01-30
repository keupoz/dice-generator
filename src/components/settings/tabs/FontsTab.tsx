import { Separator } from "@/shadcn/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/shadcn/components/ui/tabs";
import { useFontSettings, useFontsStore } from "@/stores/FontSettingsStore";
import { getFirstItem } from "@/utils/getFirstItem";
import { FC, useMemo } from "react";
import { SettingsTabContent } from "../SettingsTabContent";
import { SettingsSlider } from "../controls/SettingsSlider";
import { FontSelect } from "../partials/FontSelect/FontSelect";

export const FontsTab: FC = () => {
  const fontSettings = useFontSettings();
  const fonts = useFontsStore((state) => state.fonts);

  const fontOptions = useMemo(() => {
    return fonts.map((font) => font.fullName);
  }, [fonts]);

  return (
    <SettingsTabContent value="fonts">
      <Tabs defaultValue="text">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="mark">Mark</TabsTrigger>
        </TabsList>

        <SettingsTabContent value="text">
          <FontSelect
            options={fontOptions}
            defaultValue={fontSettings.textFont ?? getFirstItem(fonts)}
            features={fontSettings.textFeatures}
            onFont={(textFont) => {
              useFontSettings.setState({ textFont });
            }}
            onFeatures={(textFeatures) => {
              useFontSettings.setState({ textFeatures });
            }}
          />
        </SettingsTabContent>

        <SettingsTabContent value="mark">
          <FontSelect
            options={fontOptions}
            defaultValue={fontSettings.markFont ?? getFirstItem(fonts)}
            features={fontSettings.markFeatures}
            onFont={(markFont) => {
              useFontSettings.setState({ markFont });
            }}
            onFeatures={(markFeatures) => {
              useFontSettings.setState({ markFeatures });
            }}
          />
        </SettingsTabContent>
      </Tabs>

      <Separator />

      <SettingsSlider
        label="Segments"
        min={1}
        max={24}
        step={1}
        value={fontSettings.segments}
        onChange={(segments) => useFontSettings.setState({ segments })}
      />

      <SettingsSlider
        label="Font scale"
        min={0.05}
        max={2}
        step={0.05}
        value={fontSettings.fontScale}
        onChange={(fontScale) => useFontSettings.setState({ fontScale })}
      />

      <SettingsSlider
        label="SVG scale"
        min={0.05}
        max={2}
        step={0.05}
        value={fontSettings.svgScale}
        onChange={(svgScale) => useFontSettings.setState({ svgScale })}
      />

      <SettingsSlider
        label="Font depth"
        min={0.05}
        max={2}
        step={0.05}
        value={fontSettings.depth}
        onChange={(depth) => useFontSettings.setState({ depth })}
      />
    </SettingsTabContent>
  );
};
