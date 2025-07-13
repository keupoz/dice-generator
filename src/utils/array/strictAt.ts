export function strictAt<T>(arr: readonly T[], index: number): T {
  const item = arr.at(index)

  if (item === undefined) throw new Error(`No item at index ${index}`)

  return item
}
