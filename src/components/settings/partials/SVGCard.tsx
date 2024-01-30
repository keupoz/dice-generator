import { MutedText } from "@/shadcn/components/typography/muted-text";
import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent, CardFooter } from "@/shadcn/components/ui/card";
import { Separator } from "@/shadcn/components/ui/separator";
import { SVGInfo, useFontsStore } from "@/stores/FontSettingsStore";
import { TrashIcon } from "@radix-ui/react-icons";
import prettyBytes from "pretty-bytes";
import { FC, memo } from "react";
import { SettingsSwitch } from "../controls/SettingsSwitch";

export interface SVGCardProps {
  info: SVGInfo;
}

export const SVGCard: FC<SVGCardProps> = memo(({ info }) => {
  const lastModified = new Date(info.lastModified).toLocaleString();

  function handleDelete() {
    useFontsStore.setState((prev) => ({
      svgs: prev.svgs.filter((svg) => svg.id !== info.id),
    }));
  }

  function handleScaleToggle(value: boolean) {
    useFontsStore.setState((prev) => ({
      svgs: prev.svgs.map((svg) => {
        if (svg.id !== info.id) return svg;

        return { ...info, scaleByViewbox: value };
      }),
    }));
  }

  return (
    <Card>
      <CardContent className="flex gap-4 p-4">
        <div
          className="bg-checker rounded-sm w-16 h-16 shrink-0"
          dangerouslySetInnerHTML={{
            __html: info.raw,
          }}
        />

        <div className="flex flex-col gap-1 grow">
          <div className="flex gap-4">
            <p className="grow">{info.name}</p>

            <div>
              <Button
                variant="destructive"
                className="p-0 w-8 h-8"
                onClick={handleDelete}
              >
                <TrashIcon />
              </Button>
            </div>
          </div>

          <SettingsSwitch
            label="Scale by viewbox"
            checked={info.scaleByViewbox}
            onChange={handleScaleToggle}
          />
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="px-4 py-2">
        <MutedText className="flex gap-2">
          <span>{lastModified}</span>

          <span>&bull;</span>

          <span>{prettyBytes(info.fileSize)}</span>
        </MutedText>
      </CardFooter>
    </Card>
  );
});
