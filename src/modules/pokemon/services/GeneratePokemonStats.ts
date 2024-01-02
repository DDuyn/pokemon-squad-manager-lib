import { inject, injectable } from "inversify";
import { getRandomNumber } from "../../shared/services/GetRandomNumber";
import { POKEMON_DI_TYPES } from "../config/DependencyInjection";
import { CalculateExperienceFactory } from "../factories/experience/CalculateExperienceFactory";
import {
  GrowthRates,
  NatureEffect,
  Natures,
  PokemonAttribute,
  PokemonStats,
  PokemonStatsBase,
  StatKey,
  StatKeyWithoutHealth,
} from "../models/PokemonTypes";

export type GeneratePokemonStatsRequest = {
  baseStats: PokemonStatsBase;
  growthRate: GrowthRates;
  nature: Natures;
  level: number;
};

@injectable()
export class GeneratePokemonStats {
  constructor(
    @inject(POKEMON_DI_TYPES.CalculateExperienceFactory)
    private readonly calculateExperienceFactory: CalculateExperienceFactory
  ) {}

  execute(request: GeneratePokemonStatsRequest): PokemonStats {
    const { baseStats, growthRate, nature, level } = request;

    const nextLevelExperience = this.calculateExperience(level + 1, growthRate);
    const currentExperience =
      level === 1 ? 0 : this.calculateExperience(level, growthRate);

    const attributes: Record<StatKey, PokemonAttribute> = {} as Record<
      StatKey,
      PokemonAttribute
    >;

    for (const statKey in StatKey) {
      if (Object.prototype.hasOwnProperty.call(StatKey, statKey)) {
        const key = statKey as StatKey;
        attributes[key] = this.generateStat(
          { value: baseStats[key], nature: nature, level },
          key
        );
      }
    }

    return {
      attributes,
      level,
      nextLevelExperience,
      currentExperience,
    };
  }

  private calculateExperience(level: number, growthRate: GrowthRates): number {
    return this.calculateExperienceFactory.execute(level, growthRate);
  }

  private generateStat(
    data: { value: number; nature: Natures; level: number },
    statKey: StatKey
  ): PokemonAttribute {
    const { value, nature, level } = data;

    const stat: PokemonAttribute = {
      value,
      iv: getRandomNumber(0, 31),
      ev: 0,
      nv: getRandomNumber(1, 10),
    };

    stat.value =
      statKey === StatKey.health
        ? this.calculateHealthStat({ stat, level })
        : this.calculateStat({ stat, nature, level }, statKey);

    return stat;
  }

  private calculateStat(
    data: {
      stat: PokemonAttribute;
      nature: Natures;
      level: number;
    },
    statKey: StatKey
  ): number {
    const { stat, nature, level } = data;
    const base = this.calculateBaseStat(stat, level);

    const natureEffect = this.getEffectNature(
      nature,
      statKey as StatKeyWithoutHealth
    );
    const naturalValue = this.calculateNaturalValue(stat.nv, level);
    return Math.floor((base + 5) * natureEffect + naturalValue);
  }

  private calculateHealthStat(data: {
    stat: PokemonAttribute;
    level: number;
  }): number {
    const { stat, level } = data;
    const base = this.calculateBaseStat(stat, level);
    const naturalValue = this.calculateNaturalValue(stat.nv, level);
    return Math.floor(base + level + 10 + naturalValue);
  }

  private calculateBaseStat(baseStat: PokemonAttribute, level: number): number {
    const { value, iv, ev } = baseStat;
    const base = ((2 * value + iv + ev / 4) * level) / 100;

    return Math.floor(base);
  }

  private calculateNaturalValue(nv: number, level: number): number {
    return (level * nv) / 100;
  }

  private getEffectNature(nature: Natures, stat: StatKeyWithoutHealth): number {
    const effect = NatureEffect[nature];
    return effect[stat];
  }
}
