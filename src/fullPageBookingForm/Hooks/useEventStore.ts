import create from "zustand";
import { EventDBO } from "../../typings/Event";

type State = {
  event: EventDBO | null;
  setEvent: (event: EventDBO) => void;
};

export const useEventStore = create<State>((set) => ({
  event: null,
  setEvent: (event) =>
    set((state) => {
      return { ...state, event };
    }),
}));
