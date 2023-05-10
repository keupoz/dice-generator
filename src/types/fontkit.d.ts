import { Font as FontkitFont } from "fontkit";

declare module "fontkit" {
  interface FontVariationAxis {
    name: string;
    min: number;
    max: number;
    default: number;
  }

  type FontVariationSettings = Record<string, number>;

  interface Font extends FontkitFont {
    /**
     * Returns an object describing the available variation axes
     * that this font supports. Keys are setting tags, and values
     * contain the axis name, range, and default value.
     */
    variationAxes: Record<string, FontVariationAxis>;

    /**
     * Returns an object describing the named variation instances
     * that the font designer has specified. Keys are variation names
     * and values are the variation settings for this instance.
     */
    namedVariations: Record<string, FontVariationSettings>;

    /**
     * Returns a new font with the given variation settings applied.
     * Settings can either be an instance name, or an object containing
     * variation tags as specified by the `variationAxes` property.
     */
    getVariation(variation: string | FontVariationSettings): Font;
  }
}
