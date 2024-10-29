export function getFirstItem<T>(iterator: Iterable<T>): T {
  // eslint-disable-next-line no-unreachable-loop
  for (const item of iterator) {
    return item
  }

  throw new Error('Empty iterator')
}
