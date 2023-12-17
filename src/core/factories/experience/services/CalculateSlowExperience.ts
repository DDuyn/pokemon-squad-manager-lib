import { injectable } from "inversify";
import { CalculateExperienceStat } from "../../../interfaces/experience/CalculateExperienceStat";

@injectable()
export class CalculateSlowExperience implements CalculateExperienceStat {
  execute(level: number): number {
    return (5 * level ** 3) / 4;
  }
}
