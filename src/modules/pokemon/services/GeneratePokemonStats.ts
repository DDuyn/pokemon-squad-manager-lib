import { inject, injectable } from "inversify";
import { POKEMON_DI_TYPES } from "../config/DependencyInjection";
import { Pokemon } from "../models/Pokemon";
import {
  Natures,
  PokemonAttributes,
  PokemonStats,
  PokemonStatsBase,
  StatKey,
} from "../models/PokemonTypes";
import { CalculateAttributes } from "./CalculateAttributes";
import { CalculateExperience } from "./CalculateExperience";

export type GeneratePokemonStatsRequest = {
  baseAttributes: PokemonStatsBase;
  pokemon: Pokemon;
  level: number;
};

@injectable()
export class GeneratePokemonStats {
  constructor(
    @inject(POKEMON_DI_TYPES.CalculateExperience)
    private readonly calculateExperience: CalculateExperience,
    @inject(POKEMON_DI_TYPES.CalculateAttributes)
    private readonly calculateAttributes: CalculateAttributes
  ) {}

  async execute(request: GeneratePokemonStatsRequest): Promise<PokemonStats> {
    const { baseAttributes, pokemon, level } = request;
    const { growthRate } = pokemon.detailInfo;
    const { nature } = pokemon;

    const nextLevelExperience =
      await this.calculateExperience.nextLevelExperience(level, growthRate);

    const currentExperience = await this.calculateExperience.currentExperience(
      level,
      growthRate
    );

    const attributes = await this.generateAttributes(
      baseAttributes,
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

  private async generateAttributes(
    baseAttributes: PokemonStatsBase,
    nature: Natures,
    level: number
  ): Promise<PokemonAttributes> {
    const attributes: PokemonAttributes = this.initializeAttributes();
    await this.calculateAttributes.generateIVandNV(attributes);

    return this.calculateAttributes.calculateAttributes(
      baseAttributes,
      attributes,
      nature,
      level
    );
  }

  private initializeAttributes(): PokemonAttributes {
    const attributes: PokemonAttributes = {} as PokemonAttributes;

    for (const key in StatKey) {
      if (Object.prototype.hasOwnProperty.call(StatKey, key)) {
        const attributeKey = key as keyof PokemonAttributes;
        attributes[attributeKey] = {
          value: 0,
          ev: 0,
          iv: 0,
          nv: 0,
        };
      }
    }

    return attributes;
  }
}
