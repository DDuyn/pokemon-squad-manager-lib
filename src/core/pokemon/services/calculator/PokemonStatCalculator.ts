import { TYPES } from "@config/Types";
import { GrowthRates } from "@core/pokemon/types/pokemon/PokemonGrowthRates";
import {
  NatureEffect,
  Natures,
} from "@core/pokemon/types/pokemon/PokemonNatures";
import {
  PokemonStat,
  PokemonStatsBaseData,
  PokemonStatsData,
  StatKey,
  StatKeyWithoutHealth,
} from "@core/pokemon/types/pokemon/PokemonStats";
import { getRandomNumber } from "@core/shared/services";
import { inject, injectable } from "inversify";
import { StatCalculator } from "./StatCalculator";
import { ExperienceCalculatorFactory } from "./experience/ExperienceCalculatorFactory";

@injectable()
export class PokemonStatCalculator implements StatCalculator {
  constructor(
    @inject(TYPES.ExperienceCalculatorFactory)
    private readonly experienceCalculatorFactory: ExperienceCalculatorFactory
  ) {}

  generateStats(data: {
    baseStats: PokemonStatsBaseData;
    nature: Natures;
    level: number;
    growthRate: GrowthRates;
  }): PokemonStatsData {
    const { baseStats, nature, level, growthRate } = data;
    const nextLevelExperience = this.calculateExperience(level + 1, growthRate);
    const currentExperience =
      level === 1 ? 0 : this.calculateExperience(level, growthRate);
    const stats: Record<StatKey, PokemonStat> = {} as Record<
      StatKey,
      PokemonStat
    >;

    for (const statKey in StatKey) {
      if (Object.prototype.hasOwnProperty.call(StatKey, statKey)) {
        const key = statKey as StatKey;
        stats[key] = this.generateStat(
          { value: baseStats[key], nature, level },
          key
        );
      }
    }

    return {
      baseStats,
      stats,
      level,
      nextLevelExperience,
      currentExperience,
    };
  }

  private generateStat(
    data: { value: number; nature: Natures; level: number },
    statKey: StatKey
  ): PokemonStat {
    const { value, nature, level } = data;

    const stat: PokemonStat = {
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

  private calculateExperience(level: number, growthRate: GrowthRates): number {
    return this.experienceCalculatorFactory.calculateExperience(
      level,
      growthRate
    );
  }

  private calculateStat(
    data: {
      stat: PokemonStat;
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
    stat: PokemonStat;
    level: number;
  }): number {
    const { stat, level } = data;
    const base = this.calculateBaseStat(stat, level);
    const naturalValue = this.calculateNaturalValue(stat.nv, level);
    return Math.floor(base + level + 10 + naturalValue);
  }

  private calculateBaseStat(baseStat: PokemonStat, level: number): number {
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
