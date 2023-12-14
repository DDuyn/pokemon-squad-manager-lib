import { injectable } from "inversify";
import { ExperienceCalculator } from "./ExperienceCalculator";

@injectable()
export class MediumSlowExperienceCalculator implements ExperienceCalculator {
  calculateExperience(level: number) {
    return (6 / 5) * level ** 3 - 15 * level ** 2 + 100 * level - 140;
  }
}
