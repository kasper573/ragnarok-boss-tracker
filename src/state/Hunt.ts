import { Boss } from "./Boss";
import { Map } from "./Map";

export class Hunt {
  public get start() {
    if (this.killTime) {
      return new Date(
        this.killTime.getTime() + this.boss.spawnCooldown * 60 * 1000
      );
    }
    return undefined;
  }
  public get end() {
    if (this.start) {
      return new Date(this.start.getTime() + this.boss.spawnWindow * 60 * 1000);
    }
    return undefined;
  }
  public constructor(
    public readonly boss: Boss,
    public readonly map: Map = boss.map,
    public readonly killTime?: Date,
    public readonly tombstoneLocation = boss.spawnLocation
  ) {}

  update(changes: Partial<Hunt>) {
    const { boss, map, killTime, tombstoneLocation } = { ...this, ...changes };
    return new Hunt(boss, map, killTime, tombstoneLocation);
  }
}
