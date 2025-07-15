import type { InferOutput } from 'valibot'
import { objectify } from 'radashi'
import { parse } from 'valibot'
import { atom } from '~/atoms/atom'
import { PresetSchema } from '~/utils/presets/schema'

export const $presets = atom<Record<string, InferOutput<typeof PresetSchema>>>({})

export async function loadPresets(files: File[]) {
  const promises = files.map(async (file) => {
    const raw = await file.text()
    const json = JSON.parse(raw)
    const preset = parse(PresetSchema, json)

    return preset
  })

  const awaitedPromises = await Promise.all(promises)
  const presets = objectify(awaitedPromises, item => item.name)
  $presets.set({ ...$presets.get(), ...presets })
}
