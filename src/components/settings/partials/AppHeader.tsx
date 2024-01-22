import { useTheme } from "@/shadcn/components/theme-provider";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/shadcn/components/ui/toggle-group";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { FC } from "react";

export const AppHeader: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center h-14 px-2">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight grow">
        Dice generator
      </h4>

      <ToggleGroup
        type="single"
        size="sm"
        value={theme}
        onValueChange={(value) =>
          setTheme(value ? (value as "light" | "dark") : "system")
        }
      >
        <ToggleGroupItem value="dark">
          <MoonIcon />
        </ToggleGroupItem>

        <ToggleGroupItem value="light">
          <SunIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
