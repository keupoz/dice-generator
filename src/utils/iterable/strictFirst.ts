export function strictFirst<T>(iterable: Iterable<T>): T {
  // eslint-disable-next-line no-unreachable-loop
  for (const item of iterable) {
    return item
  }

  throw new Error('Empty iterator')
}
