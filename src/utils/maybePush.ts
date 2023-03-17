export function maybePush<T>(value: T | null, output: T[]) {
  if (value !== null) output.push(value);
}
