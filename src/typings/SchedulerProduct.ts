import { Schedule } from "./Schedule";
import { EntitiesMap } from "../Utils/api";

export type SchedulerProduct = {
  id: string;
  label?: string;
  objects: EntitiesMap;
  schedule: Schedule[];
};