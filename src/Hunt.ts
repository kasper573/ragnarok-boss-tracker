import { Boss } from "./Boss";
import { Map } from "./Map";

export class Hunt {
  public get start() {
    return new Date(
      this.killTime.getTime() + this.boss.spawnCooldown * 60 * 1000
    );
  }
  public get end() {
    return new Date(this.start.getTime() + this.boss.spawnWindow * 60 * 1000);
  }
  public constructor(
    public readonly boss: Boss,
    public readonly map: Map = boss.map,
    public readonly killTime: Date = new Date(),
    public readonly tombstoneLocation = boss.fixedSpawnLocation
  ) {}

  update(changes: Partial<Hunt>) {
    const { boss, map, killTime, tombstoneLocation } = { ...this, ...changes };
    return new Hunt(boss, map, killTime, tombstoneLocation);
  }
}
