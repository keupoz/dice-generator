import { Buffer } from 'node:buffer'
import { create } from 'fontkit'

export async function readFont(bufferReadable: Pick<File, 'arrayBuffer'>) {
  const rawFont = await bufferReadable.arrayBuffer()
  return create(Buffer.from(rawFont))
}
