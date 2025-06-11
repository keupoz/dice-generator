export type Executor<T> = (signal: AbortSignal) => Promise<T>

export function abortable<T>(signal: AbortSignal, executor: Executor<T>) {
  return new Promise<T>((resolve, reject) => {
    if (signal.aborted) return reject(signal.reason)

    function cleanUp() {
      signal.removeEventListener('abort', handleAbort)
    }

    function handleAbort() {
      cleanUp()
      reject(signal.reason)
    }

    signal.addEventListener('abort', handleAbort)

    executor(signal)
      .then((data) => {
        cleanUp()
        resolve(data)
      })
      .catch((error) => {
        cleanUp()
        reject(error)
      })
  })
}
