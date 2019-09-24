import { AttendeeInfoInput } from "./AttendeeInfoInput";

export type AttendeeInputData = {
  id?: string;
  checkedInAt: Date | null;
  info: AttendeeInfoInput;
};