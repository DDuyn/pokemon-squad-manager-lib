import { injectable } from "inversify";
import { CalculateExperienceAttribute } from "../CalculateExperienceAttribute";

@injectable()
export class CalculateMediumFastExperience
  implements CalculateExperienceAttribute
{
  execute(level: number): number {
    return level ** 3;
  }
}
