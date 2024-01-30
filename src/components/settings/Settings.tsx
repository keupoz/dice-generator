import { Tabs, TabsList, TabsTrigger } from "@/shadcn/components/ui/tabs";
import { FC, memo } from "react";
import { AppHeader } from "./partials/AppHeader";
import { DiceTab } from "./tabs/DiceTab";
import { FilesTab } from "./tabs/FilesTab";
import { FontsTab } from "./tabs/FontsTab";
import { GlobalTab } from "./tabs/GlobalTab";

export const Settings: FC = memo(() => {
  return (
    <>
      <AppHeader />

      <Tabs defaultValue="global" className="px-3">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="fonts">Fonts</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="dice">Dice</TabsTrigger>
        </TabsList>

        <GlobalTab />
        <FontsTab />
        <FilesTab />
        <DiceTab />
      </Tabs>
    </>
  );
});
