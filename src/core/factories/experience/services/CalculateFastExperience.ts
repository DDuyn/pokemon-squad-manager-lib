import { CalculateExperienceStat } from "@core/interfaces/experience/CalculateExperienceStat";
import { injectable } from "inversify";

@injectable()
export class CalculateFastExperience implements CalculateExperienceStat {
  execute(level: number): number {
    return (4 * level ** 3) / 5;
  }
}
