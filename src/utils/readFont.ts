import { Buffer } from "buffer";
import { create } from "fontkit";
import { readFile } from "./readFile";

export async function readFont(file: File) {
  const rawFont = await readFile(file);
  return create(Buffer.from(rawFont));
}
