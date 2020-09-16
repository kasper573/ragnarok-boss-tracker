import { Boss } from "./Boss";
import { Map } from "./Map";
import { Minutes } from "./Minutes";

export const bosses: Boss[] = [
  {
    icon: require('./assets/qs.png'),
    name: "Queen Scaraba",
    map: "dic_dun02" as Map,
    spawnCooldown: 120 as Minutes,
    spawnWindow: 1 as Minutes,
  },
  {
    icon: require('./assets/gtb.png'),
    name: "Golden Thief Bug",
    map: "prt_sewb4" as Map,
    spawnCooldown: 60 as Minutes,
    spawnWindow: 10 as Minutes,
  },
  {
    icon: require('./assets/tg.png'),
    name: "Tao Gunka",
    map: "beach_dun" as Map,
    spawnCooldown: 300 as Minutes,
    spawnWindow: 10 as Minutes,
  },
];
