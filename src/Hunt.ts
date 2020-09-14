import { Boss } from "./Boss";
import { Map } from "./Map";

export type Hunt = {
  boss: Boss;
  map: Map;
  killTime: Date;
};
