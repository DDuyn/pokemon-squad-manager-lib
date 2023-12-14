import { injectable } from "inversify";
import { ExperienceCalculator } from "./ExperienceCalculator";

@injectable()
export class MediumFastExperienceCalculator implements ExperienceCalculator {
  calculateExperience(level: number): number {
    return level ** 3;
  }
}
