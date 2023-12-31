import { injectable } from "inversify";
import { CalculateExperienceAttribute } from "../CalculateExperienceAttribute";

@injectable()
export class CalculateSlowExperience implements CalculateExperienceAttribute {
  execute(level: number): number {
    return (5 * level ** 3) / 4;
  }
}
