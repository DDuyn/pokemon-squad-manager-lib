import { TYPES } from "@config/Types";
import { ExperienceCalculatorRegistry } from "@core/pokemon/types/calculator/ExperienceCalculatorRegistry";
import { GrowthRates } from "@core/pokemon/types/pokemon/PokemonGrowthRates";
import { inject, injectable } from "inversify";

@injectable()
export class ExperienceCalculatorFactory {
  constructor(
    @inject(TYPES.ExperienceCalculatorRegistry)
    private readonly experienceCalculatorRegistry: ExperienceCalculatorRegistry
  ) {}

  calculateExperience(level: number, growthRate: GrowthRates): number {
    const experience =
      this.experienceCalculatorRegistry[growthRate].calculateExperience(level);

    return Math.floor(experience);
  }
}
