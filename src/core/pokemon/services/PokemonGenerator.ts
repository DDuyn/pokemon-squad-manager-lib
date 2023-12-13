import { TYPES } from "@config/Types";
import { Logger } from "@core/logger/interfaces/Logger";
import { getRandomNumber, getRandomToList } from "@core/shared/services";
import { inject, injectable } from "inversify";

import { PokemonRepository } from "../repository/PokemonRepository";
import {
  PokemonAbilitiesBaseData,
  PokemonAbilitiesData,
} from "../types/pokemon/PokemonAbilities";
import {
  PokemonBasicBaseData,
  PokemonBasicData,
} from "../types/pokemon/PokemonBasic";
import { Pokemon, PokemonBaseData } from "../types/pokemon/PokemonData";
import {
  PokemonDetailBaseData,
  PokemonDetailData,
} from "../types/pokemon/PokemonDetail";
import { GrowthRates } from "../types/pokemon/PokemonGrowthRates";
import { Natures } from "../types/pokemon/PokemonNatures";
import {
  PokemonStat,
  PokemonStatsBaseData,
  PokemonStatsData,
  StatKey,
} from "../types/pokemon/PokemonStats";
import { calculateHealthStat, calculateStat } from "./CalculateStat";

@injectable()
export class PokemonGenerator {
  constructor(
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.PokemonRepository)
    private readonly repository: PokemonRepository
  ) {}

  async generate(): Promise<Pokemon> {
    const pokemonBase = await this.getRandomPokemonBase();
    const pokemon = {} as Pokemon;

    pokemon.basic = this.generateBasicData(pokemonBase.basic);
    pokemon.detail = this.generateDetailData(pokemonBase.detail);
    pokemon.moves = pokemonBase.moves;
    pokemon.stats = this.generateStatsData(
      pokemonBase.stats,
      pokemon.basic.nature
    );
    pokemon.ability = this.generateAbilityData(pokemonBase.ability);

    await this.logger.info({
      message: "Pokemon generated",
      data: { pokemon },
      method: "PokemonGenerator.generate",
    });

    return pokemon;
  }

  private async getRandomPokemonBase(): Promise<PokemonBaseData> {
    const pokemonsAvailable = await this.repository.getPokemons([
      "bulbasaur",
      "charmander",
    ]); //TODO: Refactor. Cambiar tipado del parámetro de entrada por tipo Zone que contendra

    const pokemon = getRandomToList(pokemonsAvailable);
    return pokemon;
  }

  private generateBasicData(basicData: PokemonBasicBaseData): PokemonBasicData {
    return {
      id: crypto.randomUUID(),
      name: basicData.name,
      types: basicData.types,
      nature: getRandomToList(Object.values(Natures)),
    };
  }

  private generateDetailData(
    detailData: PokemonDetailBaseData
  ): PokemonDetailData {
    return {
      catchRate: detailData.catchRate,
      eggCycles: detailData.eggCycles,
      genderRatio: detailData.genderRatio,
      growthRate: getRandomToList(Object.values(GrowthRates)),
    };
  }

  private generateAbilityData(
    abilityData: PokemonAbilitiesBaseData
  ): PokemonAbilitiesData {
    return {
      availableAbilities: abilityData.availableAbilities,
      selectedAbility: getRandomToList(abilityData.availableAbilities),
    };
  }

  private generateStatsData(
    baseStats: PokemonStatsBaseData,
    nature: Natures
  ): PokemonStatsData {
    const level = 1; //TODO: El nivel dependerá de un valor aleatorio dado por la zona
    const stats = this.generateAllStats(baseStats, nature, level);

    return {
      baseStats,
      stats,
      level,
      nextLevelExperience: 100, //TODO: Calcular segun GrowthRate
      currentExperience: 0, //TODO: Calcular experiencia segun nivel y GrowthRate
    };
  }

  private generateAllStats(
    baseStats: PokemonStatsBaseData,
    nature: Natures,
    level: number
  ): Record<StatKey, PokemonStat> {
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

    return stats;
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

    stat.value = this.calculateStatValue(stat, level, nature, statKey);

    return stat;
  }

  private calculateStatValue(
    stat: PokemonStat,
    level: number,
    nature: Natures,
    statKey: StatKey
  ): number {
    return statKey === StatKey.health
      ? calculateHealthStat({ stat, level })
      : calculateStat({ stat, nature, level }, statKey);
  }
}
