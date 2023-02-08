import { Writable, writable } from "svelte/store";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utility/store-utils.js";

const SHOW_TRADITIONAL_CLOCK_LOCALSTORAGE_KEY = "--hora--show-trad";

export const showTraditionalClock: Writable<boolean> = writable(
  getLocalStorageItem(SHOW_TRADITIONAL_CLOCK_LOCALSTORAGE_KEY) ?? true
);

showTraditionalClock.subscribe((value) => {
  setLocalStorageItem(SHOW_TRADITIONAL_CLOCK_LOCALSTORAGE_KEY, value);
});

const NORMALIZE_CONVERTER_CLOCK_LOCALSTORAGE_KEY =
  "--hora--normalize-converter";

export const normalizeConverter: Writable<boolean> = writable(
  getLocalStorageItem(NORMALIZE_CONVERTER_CLOCK_LOCALSTORAGE_KEY) ?? true
);

normalizeConverter.subscribe((value) => {
  setLocalStorageItem(NORMALIZE_CONVERTER_CLOCK_LOCALSTORAGE_KEY, value);
});
