import { BufferedGeom3 } from "@/BufferedGeom3";
import { Font } from "fontkit";

export class FontCache {
  private readonly map = new Map<string, BufferedGeom3>();

  private font: Font | null = null;
  private segments: number = -1;
  private features: Record<string, boolean> = {};

  public get(
    key: string,
    font: Font,
    segments: number,
    features: Record<string, boolean>
  ) {
    if (
      this.font === font &&
      this.segments === segments &&
      this.features === features
    ) {
      return this.map.get(key) ?? null;
    }

    this.map.clear();

    return null;
  }

  public save(key: string, value: BufferedGeom3) {
    this.map.set(key, value);
  }
}
