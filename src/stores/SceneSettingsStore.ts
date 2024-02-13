import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const showGridAtom = atomWithStorage("dice-show-grid", true);
export const smoothCameraAtom = atomWithStorage("dice-smooth-camera", true);
export const baseOpacityAtom = atomWithStorage("dice-base-opacity", 0.9);
export const enableWireframeAtom = atom(false);
