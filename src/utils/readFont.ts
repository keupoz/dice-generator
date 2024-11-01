import { Buffer } from 'node:buffer'
import { create } from 'fontkit'

export async function readFont(file: File) {
  const rawFont = await file.arrayBuffer()
  return create(Buffer.from(rawFont))
}
