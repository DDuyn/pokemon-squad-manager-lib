import { inject, injectable } from "inversify";
import { Logger } from "../../../../shared/services/logger/interfaces/Logger";
import { CalculateExperienceAttribute } from "../CalculateExperienceAttribute";
import { SHARED_DI_TYPES } from "@shared/config/DependencyInjection";

@injectable()
export class CalculateErraticExperience
  implements CalculateExperienceAttribute
{
  private levelRanges = new Map<Function, Function>([
    [(level: number) => level <= 50, this.lowerThanFiftyOne],
    [(level: number) => level <= 68, this.lowerThanSixtyNine],
    [(level: number) => level <= 98, this.lowerThanNinetyNine],
    [(level: number) => level > 98, this.greaterThanNinetyNine],
  ]);

  constructor(
    @inject(SHARED_DI_TYPES.Logger) private readonly logger: Logger
  ) {}

  execute(level: number): number {
    for (const [condition, calculation] of this.levelRanges) {
      if (condition(level)) {
        return calculation(level);
      }
    }

    this.logger.error({
      message: `Invalid level ${level}`,
      data: { level },
      method: "ErraticExperienceCalculator.calculateExperience",
    });

    throw new Error(`Invalid level ${level}`);
  }

  private lowerThanFiftyOne(level: number): number {
    return level ** 3 * ((100 - level) / 50);
  }

  private lowerThanSixtyNine(level: number): number {
    return level ** 3 * ((150 - level) / 100);
  }

  private lowerThanNinetyNine(level: number): number {
    return (level ** 3 * ((1911 - 10 * level) / 3)) / 500;
  }

  private greaterThanNinetyNine(level: number): number {
    return (level ** 3 * (160 - level)) / 100;
  }
}
