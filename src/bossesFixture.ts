import { Boss } from "./Boss";
import { Minutes } from "./Minutes";

export const bosses: Boss[] = [
  {
    icon: require("./assets/qs.png"),
    name: "Queen Scaraba",
    map: {
      name: "dic_dun02",
      imageUrl: require("./assets/maps/dic_dun02.jpg"),
    },
    spawnCooldown: 120 as Minutes,
    spawnWindow: 1 as Minutes,
  },
  {
    icon: require("./assets/gtb.png"),
    name: "Golden Thief Bug",
    map: {
      name: "prt_sewb4",
      imageUrl: require("./assets/maps/prt_sewb4.jpg"),
    },
    spawnCooldown: 60 as Minutes,
    spawnWindow: 10 as Minutes,
  },
  {
    icon: require("./assets/tg.png"),
    name: "Tao Gunka",
    map: {
      name: "beach_dun",
      imageUrl: require("./assets/maps/beach_dun.jpg"),
    },
    spawnCooldown: 300 as Minutes,
    spawnWindow: 10 as Minutes,
  },
];
