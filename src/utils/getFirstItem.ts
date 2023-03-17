export function getFirstItem<T>(iterator: Iterable<T>): T {
  for (const item of iterator) {
    return item;
  }

  throw new Error("Empty iterator");
}
