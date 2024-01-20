import { useFontSettings } from "@/stores/FontSettingsStore";
import { collectFeatures } from "@/utils/collectFontFeatures";
import { getFirstItem } from "@/utils/getFirstItem";
import { Font } from "fontkit";
import { FC, useEffect, useMemo } from "react";
import { FontSelect } from "../controls/FontSelect";

export interface FontsGroupProps {
  fonts: Font[];
}

export const FontsGroup: FC<FontsGroupProps> = ({ fonts }) => {
  const fontSettings = useFontSettings();

  useEffect(() => {
    useFontSettings.setState({ fonts });
  }, [fonts]);

  useEffect(() => {
    const font = getFirstItem(fonts);
    const features = collectFeatures(font);

    useFontSettings.setState({
      textFont: font,
      markFont: font,
      textFeatures: { ...features },
      markFeatures: { ...features },
    });

    return () => {
      useFontSettings.setState({
        textFont: null,
        markFont: null,
        textFeatures: {},
        markFeatures: {},
      });
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
        defaultValue={fontSettings.textFont ?? getFirstItem(fonts)}
        features={fontSettings.textFeatures}
        onFont={(textFont) => {
          useFontSettings.setState({ textFont });
        }}
        onFeatures={(textFeatures) => {
          useFontSettings.setState({ textFeatures });
        }}
      />

      <FontSelect
        name="Mark font"
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
    </>
  );
};
