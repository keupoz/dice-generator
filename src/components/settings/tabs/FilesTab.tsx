import { LargeText } from "@/shadcn/components/typography/large-text";
import { MutedText } from "@/shadcn/components/typography/muted-text";
import { useFontsStore } from "@/stores/FontSettingsStore";
import { FC } from "react";
import { SettingsTabContent } from "../SettingsTabContent";
import { SVGCard } from "../partials/SVGCard";

export const FilesTab: FC = () => {
  const svgs = useFontsStore((state) => state.svgs);

  return (
    <SettingsTabContent value="files">
      <LargeText>SVGs</LargeText>

      {svgs.length === 0 ? (
        <MutedText>No SVGs loaded</MutedText>
      ) : (
        svgs.map((svg) => <SVGCard key={svg.id} info={svg} />)
      )}
    </SettingsTabContent>
  );
};
