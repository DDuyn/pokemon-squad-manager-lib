import { injectable } from "inversify";
import { ExperienceCalculator } from "./ExperienceCalculator";

@injectable()
export class SlowExperienceCalculator implements ExperienceCalculator {
  calculateExperience(level: number): number {
    return (5 * level ** 3) / 4;
  }
}
