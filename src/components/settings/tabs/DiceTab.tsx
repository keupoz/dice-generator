import { useDiceRegistryStore } from "@/components/dice/utils/registry";
import { FC, useMemo, useState } from "react";
import { SettingsTabContent } from "../SettingsTabContent";
import { SettingsSelect } from "../controls/SettingsSelect";
import { DieSettings } from "../partials/DieSettings";

export const DiceTab: FC = () => {
  const dice = useDiceRegistryStore((state) => state.dice);

  const [currentDie, setCurrentDie] = useState(() => dice[0]);

  const options = useMemo(() => {
    return dice.map((info) => info.config.name);
  }, [dice]);

  function selectDie(name: string) {
    const info = dice.find((info) => info.config.name === name);

    setCurrentDie(info);
  }

  return (
    <SettingsTabContent value="dice">
      <SettingsSelect
        label="Die"
        options={options}
        value={currentDie?.config.name ?? ""}
        onChange={selectDie}
      />

      {currentDie && (
        <DieSettings key={currentDie.config.name} info={currentDie} />
      )}
    </SettingsTabContent>
  );
};
