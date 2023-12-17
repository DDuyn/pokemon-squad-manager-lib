import { TYPES } from "@config/Types";
import { CalculateExperienceFactoryRegistry } from "@core/types/experience/ExperienceCalculatorRegistry";
import { GrowthRates } from "@core/types/pokemon/PokemonGrowthRates";
import { inject, injectable } from "inversify";

@injectable()
export class CalculateExperienceFactory {
  constructor(
    @inject(TYPES.CalculateExperienceFactoryRegistry)
    private readonly experienceFactory: CalculateExperienceFactoryRegistry
  ) {}

  execute(level: number, growthRate: GrowthRates): number {
    const experience = this.experienceFactory[growthRate].execute(level);

    return Math.floor(experience);
  }
}
