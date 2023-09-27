import { readFile } from "@/utils/readFile";
import { Buffer } from "buffer";
import { Font, create as createFont } from "fontkit";
import { FC, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AppUI } from "./AppUI";

export interface AppWrapperProps {
  fonts: Font[];
}

export const AppWrapper: FC<AppWrapperProps> = ({ fonts }) => {
  const [userFonts, setUserFonts] = useState<Font[]>([]);

  const finalFonts = useMemo(() => {
    return [...fonts, ...userFonts];
  }, [fonts, userFonts]);

  const { getRootProps } = useDropzone({
    noClick: true,
    accept: {
      "font/ttf": [".ttf"],
      "font/otf": [".otf"],
      "font/woff": [".woff"],
      "font/woff2": [".woff2"],
    },
    async onDrop(files) {
      const promises = files.map(async (file) => {
        const rawFont = await readFile(file);
        return createFont(Buffer.from(rawFont));
      });

      const fonts = await Promise.all(promises);

      setUserFonts((prev) => [...prev, ...fonts]);
    },
  });

  return (
    <div {...getRootProps()}>
      <AppUI fonts={finalFonts} />
    </div>
  );
};
