import { create } from "zustand";

interface State {
  activeCategory: string;
  setActiveCategory: (slug: string) => void;
}

export const useCategory = create<State>()((set) => ({
  activeCategory: "",
  setActiveCategory: (slug) => set({ activeCategory: slug }),
}));
