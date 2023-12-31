import { inject, injectable } from "inversify";
import { POKEMON_DI_TYPES } from "../../config/DependencyInjection";
import { GrowthRates } from "../../models/PokemonTypes";

import { CalculateExperienceAttribute } from "./CalculateExperienceAttribute";

export type CalculateExperienceFactoryRegistry = {
  [key in GrowthRates]: CalculateExperienceAttribute;
};

@injectable()
export class CalculateExperienceFactory {
  constructor(
    @inject(POKEMON_DI_TYPES.CalculateExperienceFactoryRegistry)
    private readonly experienceFactory: CalculateExperienceFactoryRegistry
  ) {}

  execute(level: number, growthRate: GrowthRates): number {
    const experience = this.experienceFactory[growthRate].execute(level);

    return Math.floor(experience);
  }
}
