import type { GenericSchema } from 'valibot'
import { safeParse } from 'valibot'
import { atom } from './atom'

export function persistent<TValue>(key: string, initialValue: TValue, schema: GenericSchema<TValue>) {
  const $persistent = atom(initialValue)
  const set = $persistent.set

  $persistent.set = (value) => {
    const encoded = JSON.stringify(value)
    localStorage.setItem(key, encoded)
    set(value)
  }

  function restore() {
    const raw = localStorage.getItem(key)

    if (raw === null) return

    const decoded = JSON.parse(raw)
    const parseResult = safeParse(schema, decoded)

    if (parseResult.success) set(parseResult.output)
  }

  window.addEventListener('storage', restore)

  restore()

  return $persistent
}
