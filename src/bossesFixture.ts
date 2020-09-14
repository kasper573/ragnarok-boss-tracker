import { Boss } from "./Boss";
import { Map } from "./Map";
import { Minutes } from "./Minutes";

export const bosses: Boss[] = [
  {
    name: "Queen Scaraba",
    map: "dic_dun02" as Map,
    spawnTime: 120 as Minutes,
    spawnWindow: 1 as Minutes,
  },
  {
    name: "Golden Thief Bug",
    map: "prt_sewb4" as Map,
    spawnTime: 60 as Minutes,
    spawnWindow: 10 as Minutes,
  },
  {
    name: "Tao Gunka",
    map: "beach_dun" as Map,
    spawnTime: 300 as Minutes,
    spawnWindow: 10 as Minutes,
  },
];
