import { injectable } from "inversify";
import { CalculateExperienceAttribute } from "../CalculateExperienceAttribute";

@injectable()
export class CalculateMediumSlowExperience
  implements CalculateExperienceAttribute
{
  execute(level: number) {
    return (6 / 5) * level ** 3 - 15 * level ** 2 + 100 * level - 140;
  }
}
