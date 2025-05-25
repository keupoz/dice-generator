export function createCache<Key extends WeakKey, Value>() {
  const cacheMap = new WeakMap<Key, Value>()

  function cache(key: Key, defaultValue: Value) {
    const cached = cacheMap.get(key)
    if (!cached) cacheMap.set(key, defaultValue)
    return cached ?? defaultValue
  }

  return cache
}
