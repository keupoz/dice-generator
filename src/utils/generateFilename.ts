import { generateTimestamp } from './generateTimestamp'

export function generateFilename(name: string, extension: string, extraName?: string) {
  const timestamp = generateTimestamp(new Date())

  if (extraName) {
    name += `-${extraName}`
  }

  return `${name}-${timestamp}.${extension}`
}
