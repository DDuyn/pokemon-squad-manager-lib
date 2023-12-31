import { injectable } from "inversify";
import { CalculateExperienceAttribute } from "../CalculateExperienceAttribute";

@injectable()
export class CalculateFastExperience implements CalculateExperienceAttribute {
  execute(level: number): number {
    return (4 * level ** 3) / 5;
  }
}
