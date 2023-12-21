import { TYPES } from "@config/Types";
import { LevelRange } from "@core/types/location/Location";
import { Pokemon } from "@core/types/pokemon/PokemonData";
import { GrowthRates } from "@core/types/pokemon/PokemonGrowthRates";
import { NatureEffect, Natures } from "@core/types/pokemon/PokemonNatures";
import {
  PokemonStat,
  PokemonStatsData,
  StatKey,
  StatKeyWithoutHealth,
} from "@core/types/pokemon/PokemonStats";
import { getRandomNumber } from "@shared/services/GetRandomNumber";
import { inject, injectable } from "inversify";
import { CalculateExperienceFactory } from "../factories/experience/CalculateExperienceFactory";

@injectable()
export class GeneratePokemonStats {
  constructor(
    @inject(TYPES.CalculateExperienceFactory)
    private readonly calculateExperienceFactory: CalculateExperienceFactory
  ) {}

  execute(pokemon: Pokemon, levelRange: LevelRange): PokemonStatsData {
    const { base, basic, detail } = pokemon;
    const level = getRandomNumber(levelRange.min, levelRange.max);

    const nextLevelExperience = this.calculateExperience(
      level + 1,
      detail.growthRate
    );
    const currentExperience =
      level === 1 ? 0 : this.calculateExperience(level, detail.growthRate);
    const stats: Record<StatKey, PokemonStat> = {} as Record<
      StatKey,
      PokemonStat
    >;

    for (const statKey in StatKey) {
      if (Object.prototype.hasOwnProperty.call(StatKey, statKey)) {
        const key = statKey as StatKey;
        stats[key] = this.generateStat(
          { value: base[key], nature: basic.nature, level },
          key
        );
      }
    }

    return {
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
    return this.calculateExperienceFactory.execute(level, growthRate);
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
