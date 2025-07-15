type Callback = () => void

const timers = new WeakMap<Callback, number | undefined>()

export function enqueue(callback: Callback) {
  clearTimeout(timers.get(callback))
  timers.set(callback, setTimeout(callback, 0, undefined))
}
