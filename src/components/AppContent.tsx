import { Button } from "@/shadcn/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/shadcn/components/ui/drawer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/shadcn/components/ui/resizable";
import { SVGInfo, useFontsStore } from "@/stores/FontSettingsStore";
import { readFont } from "@/utils/readFont";
import { readSVG } from "@/utils/readSVG";
import { GearIcon } from "@radix-ui/react-icons";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Font } from "fontkit";
import { FC } from "react";
import { useDropzone } from "react-dropzone";
import { Scene } from "./Scene";
import { Settings } from "./settings/Settings";

export const AppContent: FC = () => {
  const { getRootProps } = useDropzone({
    noClick: true,
    accept: {
      "font/ttf": [".ttf"],
      "font/otf": [".otf"],
      "font/woff": [".woff"],
      "font/woff2": [".woff2"],
      "image/svg+xml": [".svg"],
    },
    async onDrop(files) {
      const fontPromises: Promise<Font>[] = [];
      const svgPromises: Promise<SVGInfo>[] = [];

      for (const file of files) {
        if (file.name.endsWith(".svg")) {
          svgPromises.push(readSVG(file));
        } else {
          fontPromises.push(readFont(file));
        }
      }

      const fontsPromise = Promise.all(fontPromises);
      const svgsPromise = Promise.all(svgPromises);

      const [fonts, svgs] = await Promise.all([fontsPromise, svgsPromise]);

      useFontsStore.setState((prev) => ({
        fonts: fonts.length ? [...prev.fonts, ...fonts] : prev.fonts,
        svgs: svgs.length ? [...prev.svgs, ...svgs] : prev.svgs,
      }));
    },
  });

  const isDesktop = useMediaQuery("(min-width: 900px)");

  if (isDesktop) {
    return (
      <div {...getRootProps()} className="h-screen">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            style={{ overflowY: "auto" }}
            defaultSize={25}
            minSize={25}
            maxSize={35}
          >
            <Settings />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel>
            <Scene />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    );
  }

  return (
    <div {...getRootProps()} className="h-screen">
      <Scene />

      <Drawer>
        <DrawerTrigger asChild>
          <Button className="rounded-full p-0 w-12 h-12 fixed bottom-8 right-8">
            <GearIcon className="w-6 h-6" />
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="max-h-svh overflow-auto">
            <Settings />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
