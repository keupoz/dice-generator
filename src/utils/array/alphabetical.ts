export function alphabetical<T>(arr: T[], getValue: (item: T) => string) {
  return arr.sort((a, b) => {
    return getValue(a).localeCompare(getValue(b), undefined, { numeric: true, sensitivity: 'base' })
  })
}
