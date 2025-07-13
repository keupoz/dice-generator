export function createCache<TKey extends WeakKey, TValue>() {
  const cacheMap = new WeakMap<TKey, TValue>()

  function cache(key: TKey, initValue: () => TValue) {
    const cached = cacheMap.get(key)

    if (cached === undefined) {
      const value = initValue()
      cacheMap.set(key, value)
      return value
    }

    return cached
  }

  return cache
}
