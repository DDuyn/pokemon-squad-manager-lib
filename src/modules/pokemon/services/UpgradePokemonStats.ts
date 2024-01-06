import { inject, injectable } from "inversify";
import { POKEMON_DI_TYPES } from "../config/DependencyInjection";
import { Pokemon } from "../models/Pokemon";
import { PokemonStats, PokemonStatsBase } from "../models/PokemonTypes";
import { CalculateAttributes } from "./CalculateAttributes";
import { CalculateExperience } from "./CalculateExperience";

@injectable()
export class UpgradePokemonStats {
  constructor(
    @inject(POKEMON_DI_TYPES.CalculateExperience)
    private readonly calculateExperience: CalculateExperience,
    @inject(POKEMON_DI_TYPES.CalculateAttributes)
    private readonly calculateAttributes: CalculateAttributes
  ) {}

  async execute(request: {
    baseStats: PokemonStatsBase;
    pokemon: Pokemon;
    level: number;
  }): Promise<PokemonStats> {
    const { baseStats, pokemon, level } = request;
    const { growthRate } = pokemon.detailInfo;
    const currentAttributes = pokemon.stats.current.attributes;
    const nature = pokemon.nature;
    const currentExperience = pokemon.stats.current.currentExperience;

    const nextLevelExperience =
      await this.calculateExperience.nextLevelExperience(level, growthRate);

    const attributes = await this.calculateAttributes.calculateAttributes(
      baseStats,
      currentAttributes,
      nature,
      level
    );

    return {
      attributes,
      level,
      nextLevelExperience,
      currentExperience,
    };
  }
}
