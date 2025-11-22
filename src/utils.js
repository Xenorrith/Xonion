import { create } from "zustand";

const useRouter = create((set) => ({
  current: null,
  setCurrent: (page) => set({ current: page }),
}));

const useMenu = create((set) => ({
  show: false,
  updated: false,
  x: 0,
  y: 0,
  id: null,
  setShow: (show) => set({ show }),
  setX: (x) => set({ x }),
  setUpdated: (updated) => set({ updated }),
  setY: (y) => set({ y }),
  setId: (id) => set({ id }),
}));

export { useRouter, useMenu };
