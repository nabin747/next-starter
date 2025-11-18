import { create } from 'zustand';

type CounterState = {
  count: number;
  increment: (step?: number) => void;
  reset: () => void;
};

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: (step = 1) =>
    set((state) => ({
      count: state.count + step,
    })),
  reset: () => set({ count: 0 }),
}));
