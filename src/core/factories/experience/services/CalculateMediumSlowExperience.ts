import { injectable } from "inversify";
import { CalculateExperienceStat } from "../../../interfaces/experience/CalculateExperienceStat";

@injectable()
export class CalculateMediumSlowExperience implements CalculateExperienceStat {
  execute(level: number) {
    return (6 / 5) * level ** 3 - 15 * level ** 2 + 100 * level - 140;
  }
}
