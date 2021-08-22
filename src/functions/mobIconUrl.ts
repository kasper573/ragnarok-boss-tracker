import { assetUrl } from "./assetUrl";
import { Mob } from "../state/Mob";

export const mobIconUrl = (mob: Mob) => assetUrl(`mobs/${mob.id}.gif`);
