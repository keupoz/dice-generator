import type { ManifoldToplevel } from 'manifold-3d'
import type { InferOutput } from 'valibot'
import { function_, is, object } from 'valibot'
import { createCache } from '~/utils/createCache'

const DeletableSchema = object({
  delete: function_(),
})

type Deletable = InferOutput<typeof DeletableSchema>
type DeletableConstructor = new (...args: any[]) => Deletable
type MemoryRegistry = Deletable[]

function clearMemory(memoryRegistry: MemoryRegistry) {
  for (const entry of memoryRegistry) {
    entry.delete()
  }

  memoryRegistry.length = 0
}

function collectDeletable(Module: ManifoldToplevel, memoryRegistry: MemoryRegistry, object: unknown): boolean {
  let isCollected = false

  if (Array.isArray(object)) {
    for (const item of object) {
      isCollected ||= collectDeletable(Module, memoryRegistry, item)
    }
  } else if (is(DeletableSchema, object)) {
    memoryRegistry.push(object)
    isCollected = true
  }

  return isCollected
}

function collectAndProxify<T extends DeletableConstructor>(Module: ManifoldToplevel, memoryRegistry: MemoryRegistry, target: T) {
  const isCollected = collectDeletable(Module, memoryRegistry, target)
  return isCollected ? proxify(Module, memoryRegistry, target) : target
}

function proxify<T extends DeletableConstructor>(Module: ManifoldToplevel, memoryRegistry: MemoryRegistry, target: T) {
  // eslint-disable-next-line ts/no-unsafe-function-type
  const cache = createCache<Function, Function>()

  return new Proxy(target, {
    construct(target, argArray, newTarget): T {
      const result = Reflect.construct(target, argArray, newTarget)
      return collectAndProxify(Module, memoryRegistry, result)
    },

    get(target, p, receiver) {
      const value = Reflect.get(target, p, receiver)

      if (p === Symbol.hasInstance) return value
      if (typeof value !== 'function') return value

      return cache(value, () => (...args: any[]) => {
        const result = value.apply(target, args)
        return collectAndProxify(Module, memoryRegistry, result)
      })
    },
  })
}

export interface SafeManifoldResult<T> {
  value: T
  cleanup: () => void
}

export type SafeManifold = <T>(operation: (Module: ManifoldToplevel) => T) => SafeManifoldResult<T>

export function wrapManifoldModule(Module: ManifoldToplevel): SafeManifold {
  return function safeManifold(operation) {
    const memoryRegistry: MemoryRegistry = []
    const value = operation({
      ...Module,
      Manifold: proxify(Module, memoryRegistry, Module.Manifold),
      CrossSection: proxify(Module, memoryRegistry, Module.CrossSection),
    })

    function cleanup() {
      clearMemory(memoryRegistry)
    }

    return { value, cleanup }
  }
}
