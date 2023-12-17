import { injectable } from "inversify";
import { CalculateExperienceStat } from "../../../interfaces/experience/CalculateExperienceStat";

@injectable()
export class CalculateMediumFastExperience implements CalculateExperienceStat {
  execute(level: number): number {
    return level ** 3;
  }
}
