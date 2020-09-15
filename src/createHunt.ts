import { Boss } from "./Boss";

export const createHunt = (boss: Boss) => ({
  boss,
  map: boss.map,
  killTime: new Date(Date.now() - boss.spawnTime * 1000),
});
