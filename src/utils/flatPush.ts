export function flatPush<T>(item: T | T[], arr: T[]) {
  if (Array.isArray(item)) {
    arr.push(...item);
  } else {
    arr.push(item);
  }
}
