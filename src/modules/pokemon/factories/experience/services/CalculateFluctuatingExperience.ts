import { TYPES } from "@config/Types";
import { inject, injectable } from "inversify";
import { Logger } from "../../../../shared/services/logger/interfaces/Logger";
import { CalculateExperienceAttribute } from "../CalculateExperienceAttribute";

@injectable()
export class CalculateFluctuatingExperience
  implements CalculateExperienceAttribute
{
  private levelRanges = new Map<Function, Function>([
    [(level: number) => level <= 15, this.lowerThanSixteen],
    [(level: number) => level <= 36, this.lowerThanThirtySeven],
    [(level: number) => level > 36, this.greaterThanThirtySix],
  ]);

  constructor(@inject(TYPES.Logger) private readonly logger: Logger) {}

  execute(level: number): number {
    for (const [condition, calculation] of this.levelRanges) {
      if (condition(level)) {
        return calculation(level);
      }
    }

    this.logger.error({
      message: `Invalid level ${level}`,
      data: { level },
      method: "FluctuatingExperienceCalculator.execute",
    });

    throw new Error(`Invalid level ${level}`);
  }

  private lowerThanSixteen(level: number): number {
    return level ** 3 * (((level + 1) / 3 + 24) / 50);
  }

  private lowerThanThirtySeven(level: number): number {
    return level ** 3 * ((level + 14) / 50);
  }

  private greaterThanThirtySix(level: number): number {
    return level ** 3 * ((level / 2 + 32) / 50);
  }
}
