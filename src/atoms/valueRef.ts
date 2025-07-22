export interface ValueRef<TValue> {
  value: TValue
}

export function createValueRef<TValue>(value: TValue): ValueRef<TValue> {
  return { value }
}
