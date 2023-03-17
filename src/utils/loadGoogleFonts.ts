import { z } from "zod";

export type GoogleFont = z.infer<typeof GoogleFontSchema>;
export type GoogleFonts = z.infer<typeof GoogleFontsSchema>;

const GoogleFontSchema = z.object({
  family: z.string(),
  category: z.string(),
  files: z.record(z.string()),
});

const GoogleFontsSchema = z.object({
  items: GoogleFontSchema.array(),
});

export async function loadGoogleFonts(apiKey: string) {
  const url = `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=alpha`;
  const r = await fetch(url, { headers: { Accept: "application/json" } });
  const raw = await r.json();

  return GoogleFontsSchema.parse(raw);
}
