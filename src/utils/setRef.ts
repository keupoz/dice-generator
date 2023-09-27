import { Ref } from "react";

export function setRef<T>(ref: Ref<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null) {
    (ref as Record<"current", T>).current = value;
  }
}
