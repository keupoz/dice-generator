export function getArrayItem<T>(arr: T[], index: number): T {
  if (index < 0) index += arr.length;

  const item = arr[index];

  if (item === undefined) {
    throw new Error("Expected defined item");
  }

  return item;
}
