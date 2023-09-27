import { atomWithStorage } from "jotai/utils";

const systemDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

export const darkModeAtom = atomWithStorage("antd-dark-mode", systemDarkMode);
