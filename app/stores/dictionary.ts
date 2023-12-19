import { create } from "zustand";

export interface IOption {
  value: string;
  label: string;
}

interface IDictionaryProps {
  categories: IOption[];
  setDictionary: (
    field: keyof Omit<IDictionaryProps, "setDictionary">,
    value: IOption[]
  ) => void;
}

const useDictionary = create<IDictionaryProps>((set, get) => ({
  categories: [],
  setDictionary: (key, value) => set({ [key]: value }),
}));

export default useDictionary;
