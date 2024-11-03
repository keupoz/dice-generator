export function splitArray<T>(array: T[], sectionSize: number) {
  const result = []

  for (let i = 0; i < array.length; i += sectionSize) {
    result.push(array.slice(i, i + sectionSize))
  }

  return result
}
