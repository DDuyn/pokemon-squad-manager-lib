import { injectable } from "inversify";
import { ExperienceCalculator } from "./ExperienceCalculator";

@injectable()
export class FastExperienceCalculator implements ExperienceCalculator {
  calculateExperience(level: number): number {
    return (4 * level ** 3) / 5;
  }
}
