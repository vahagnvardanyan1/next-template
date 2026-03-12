import type { StateCreator } from "zustand";
import type { IUiStore } from "./types";

const createUiSlice: StateCreator<IUiStore> = () => ({
  sidebarOpen: false,
  counter: 0,
});

export default createUiSlice;
