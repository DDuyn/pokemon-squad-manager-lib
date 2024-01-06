import { inject, injectable } from "inversify";
import { POKEMON_DI_TYPES } from "../config/DependencyInjection";
import { CalculateExperienceFactory } from "../factories/experience/CalculateExperienceFactory";
import { GrowthRates } from "../models/PokemonTypes";

@injectable()
export class CalculateExperience {
  constructor(
    @inject(POKEMON_DI_TYPES.CalculateExperienceFactory)
    private readonly calculateExperienceFactory: CalculateExperienceFactory
  ) {}

  async nextLevelExperience(
    level: number,
    growthRate: GrowthRates
  ): Promise<number> {
    return this.calculateExperienceFactory.execute(level + 1, growthRate);
  }

  async currentExperience(
    level: number,
    growthRate: GrowthRates
  ): Promise<number> {
    return level === 1
      ? 0
      : this.calculateExperienceFactory.execute(level, growthRate);
  }
}
