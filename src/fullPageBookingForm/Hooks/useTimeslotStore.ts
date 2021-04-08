import create from "zustand";
import { Availability } from "../../typings/Availability";

type State = {
  selectedTimeslot: Availability | null;
  setSelectedTimeslot: (timeslot: Availability) => void;
};

export const useTimeslotStore = create<State>((set) => ({
  selectedTimeslot: null,
  setSelectedTimeslot: (timeslot) =>
    set((state) => ({ ...state, selectedTimeslot: timeslot })),
}));
