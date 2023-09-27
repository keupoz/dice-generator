import { atomWithStorage } from "jotai/utils";

export const showGridAtom = atomWithStorage("dice-show-grid", true);
export const smoothCameraAtom = atomWithStorage("dice-smooth-camera", false);
export const baseOpacityAtom = atomWithStorage("dice-base-opacity", 1);
