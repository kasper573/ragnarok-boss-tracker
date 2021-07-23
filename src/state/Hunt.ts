import { Mob } from "./Mob";
import { MapId } from "./MapId";

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
    public readonly mapId: MapId = mob.mapId,
    public readonly killTime?: Date,
    public readonly tombstoneLocation = mob.spawnLocation
  ) {}

  update(changes: Partial<Hunt>) {
    const { mob, mapId, killTime, tombstoneLocation } = { ...this, ...changes };
    return new Hunt(mob, mapId, killTime, tombstoneLocation);
  }
}
