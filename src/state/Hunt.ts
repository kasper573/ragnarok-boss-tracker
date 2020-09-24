import { Mob } from "./Mob";
import { Map } from "./Map";

export class Hunt {
  public get start() {
    if (this.killTime) {
      return new Date(
        this.killTime.getTime() + this.mob.spawnCooldown * 60 * 1000
      );
    }
    return undefined;
  }
  public get end() {
    if (this.start) {
      return new Date(this.start.getTime() + this.mob.spawnWindow * 60 * 1000);
    }
    return undefined;
  }
  public constructor(
    public readonly mob: Mob,
    public readonly map: Map = mob.map,
    public readonly killTime?: Date,
    public readonly tombstoneLocation = mob.spawnLocation
  ) {}

  update(changes: Partial<Hunt>) {
    const { mob, map, killTime, tombstoneLocation } = { ...this, ...changes };
    return new Hunt(mob, map, killTime, tombstoneLocation);
  }
}
