import { useFontSettings } from "@/stores/FontSettingsStore";
import { collectFeatures } from "@/utils/collectFontFeatures";
import { Font } from "fontkit";
import { FC, useEffect, useMemo } from "react";
import { FontSelect } from "../controls/FontSelect";

export interface FontsGroupProps {
  fonts: Font[];
}

export const FontsGroup: FC<FontsGroupProps> = ({ fonts }) => {
  const fontSettings = useFontSettings();

  useEffect(() => {
    fontSettings.setFonts(fonts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fonts]);

  useEffect(() => {
    fontSettings.setTextFont(fonts[0]);
    fontSettings.setMarkFont(fonts[0]);

    fontSettings.setTextFeatures(collectFeatures(fonts[0]));
    fontSettings.setMarkFeatures(collectFeatures(fonts[0]));

    return () => {
      fontSettings.setTextFont(null);
      fontSettings.setMarkFont(null);

      fontSettings.setTextFeatures({});
      fontSettings.setMarkFeatures({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fontOptions = useMemo(() => {
    return fonts.map((font) => font.fullName);
  }, [fonts]);

  return (
    <>
      <FontSelect
        name="Text font"
        options={fontOptions}
        defaultValue={fontSettings.textFont ?? fonts[0]}
        features={fontSettings.textFeatures}
        onFont={(font) => {
          fontSettings.setTextFont(font);
        }}
        onFeatures={(features) => {
          fontSettings.setTextFeatures(features);
        }}
      />

      <FontSelect
        name="Mark font"
        options={fontOptions}
        defaultValue={fontSettings.markFont ?? fonts[0]}
        features={fontSettings.markFeatures}
        onFont={(font) => {
          fontSettings.setMarkFont(font);
        }}
        onFeatures={(features) => {
          fontSettings.setMarkFeatures(features);
        }}
      />
    </>
  );
};
