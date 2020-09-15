import { Boss } from "./Boss";

export const createHunt = (boss: Boss) => ({
  boss,
  map: boss.map,
  killTime: new Date(),
});
