import { writable } from './writable'

export function atom<TValue>(value: TValue) {
  return writable({ value })
}
