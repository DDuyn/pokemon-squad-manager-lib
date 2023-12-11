import { getRandomToList } from "@core/shared/services";
import { GrowthRates } from "./types/pokemon/GrowthRates";
import { PokemonAbilities } from "./types/pokemon/PokemonAbilities";
import { PokemonBasicInfo } from "./types/pokemon/PokemonBasicInfo";
import { PokemonDetailedInfo } from "./types/pokemon/PokemonDetailInfo";
import { PokemonInfo } from "./types/pokemon/PokemonInfo";
import { PokemonBaseStats, PokemonStats } from "./types/pokemon/PokemonStats";
import { PokemonTypes } from "./types/pokemon/PokemonTypes";

export class Pokemon {
  private constructor(
    private readonly basic: PokemonBasicInfo,
    private readonly abilities: PokemonAbilities,
    private readonly stats: PokemonStats,
    private readonly detail: PokemonDetailedInfo
  ) {
    this.info.basic = this.basic;
    this.info.stats = this.stats;
    this.info.ability = this.abilities;
    this.info.detail = this.detail;
  }

  get id(): string {
    return this.basic.id;
  }

  get info(): PokemonInfo {
    return {
      basic: this.basic,
      stats: this.stats,
      moves: { selectedMoves: [], learnableMoves: [] },
      ability: this.abilities,
      detail: this.detail,
    };
  }

  static generate(info: {
    name: string;
    types: PokemonTypes;
    abilities: string[];
    stats: PokemonBaseStats;
    detail: { eggCycles: number; catchRate: number; genderRatio: number };
  }): Pokemon {
    const stats = this.generateStats(info.stats);
    const abilities = this.generateAbilities(info.abilities);
    const detail = this.generateDetailedInfo(info.detail);
    const basic = this.generateBasicInfo(info.name, info.types);

    return new Pokemon(basic, abilities, stats, detail);
  }

  private static generateBasicInfo(
    name: string,
    types: PokemonTypes
  ): PokemonBasicInfo {
    return {
      id: crypto.randomUUID(),
      name,
      types,
      nature: "Hardy",
    };
  }

  private static generateStats(stats: PokemonBaseStats): PokemonStats {
    return {
      baseStats: stats,
      level: 1,
      currentExperience: 0,
      nextLevelExperience: 100, //TODO: Calcular experiencia necesaria para subir de nivel según GrowthRate
    };
  }

  private static generateDetailedInfo(detail: {
    eggCycles: number;
    catchRate: number;
    genderRatio: number;
  }): PokemonDetailedInfo {
    return {
      eggCycles: detail.eggCycles,
      catchRate: detail.catchRate,
      genderRatio: detail.genderRatio,
      growthRate: getRandomToList(Object.values(GrowthRates)),
    };
  }

  private static generateAbilities(abilities: string[]): PokemonAbilities {
    return {
      selectedAbility: getRandomToList(abilities),
      availableAbilities: abilities,
    };
  }
}
