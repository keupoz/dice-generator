import { useLoader } from "@react-three/fiber";
import { Buffer } from "buffer";
import { create as createFont } from "fontkit";
import { FC, Suspense } from "react";
import { FileLoader } from "three";
import { AppContent } from "./AppContent";

const LOCAL_FONTS = import.meta.glob("@/assets/fonts/*", {
  eager: true,
  as: "url",
});

const FONTS = [
  // Roboto Regular
  "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",

  // Roboto SLab
  "https://fonts.gstatic.com/s/robotoslab/v24/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISWaG5iddG-1A.ttf",

  // Lobster
  "https://fonts.gstatic.com/s/lobster/v28/neILzCirqoswsqX9_oWsMqEzSJQ.ttf",

  // Righteous
  "https://fonts.gstatic.com/s/righteous/v13/1cXxaUPXBpj2rGoU7C9mj3uEicG01A.ttf",

  // Edu NSW ACT Foundation
  "https://fonts.gstatic.com/s/edunswactfoundation/v2/raxRHjqJtsNBFUi8WO0vUBgc9D-2lV_oQdCAYlt_QTQ0vUxJki9tovGLeC-sfguJ.ttf",

  // Material Symbols Rounded
  "https://fonts.gstatic.com/s/materialsymbolsrounded/v106/syl0-zNym6YjUruM-QrEh7-nyTnjDwKNJ_190FjpZIvDmUSVOK7BDJ_vb9vUSzq3wzLK-P0J-V_Zs-QtQth3-jOc7TOVpeRL2w5rwZu2rIelXxc.woff2",

  ...Object.values(LOCAL_FONTS),
];

export const App: FC = () => {
  return (
    <Suspense>
      <AppWrapper />
    </Suspense>
  );
};

const AppWrapper: FC = () => {
  const rawFonts = useLoader(FileLoader, FONTS, (loader) => {
    loader.setResponseType("arraybuffer");
  });

  const fonts = rawFonts.map((rawFont) => {
    if (!(rawFont instanceof ArrayBuffer)) {
      throw new Error("Expected ArrayBuffer");
    }

    return createFont(Buffer.from(rawFont));
  });

  return <AppContent fonts={fonts} />;
};
