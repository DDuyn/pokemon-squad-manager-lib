import { TYPES } from "@config/Types";
import { Gender } from "@core/pokemon/types/pokemon/PokemonGender";
import { getRandomNumber, getRandomToList } from "@core/shared/services";
import { Logger } from "@core/shared/services/logger/interfaces/Logger";
import { inject, injectable } from "inversify";
import { PokemonRepository } from "../../repository/PokemonRepository";
import {
  PokemonAbilitiesBaseData,
  PokemonAbilitiesData,
} from "../../types/pokemon/PokemonAbilities";
import {
  PokemonBasicBaseData,
  PokemonBasicData,
} from "../../types/pokemon/PokemonBasic";
import { Pokemon } from "../../types/pokemon/PokemonData";
import {
  PokemonDetailBaseData,
  PokemonDetailData,
} from "../../types/pokemon/PokemonDetail";
import { GrowthRates } from "../../types/pokemon/PokemonGrowthRates";
import { Natures } from "../../types/pokemon/PokemonNatures";
import {
  PokemonStatsBaseData,
  PokemonStatsData,
} from "../../types/pokemon/PokemonStats";
import { StatCalculator } from "../calculator/StatCalculator";

@injectable()
export class PokemonGenerator {
  constructor(
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.PokemonRepository)
    private readonly repository: PokemonRepository,
    @inject(TYPES.StatCalculator)
    private readonly statCalculator: StatCalculator
  ) {}

  async generate(name: string): Promise<Pokemon> {
    const pokemonBase = await this.repository.getPokemon(name);
    const pokemon = {} as Pokemon;

    pokemon.detail = this.generateDetailData(pokemonBase.detail);
    pokemon.basic = this.generateBasicData(
      pokemonBase.basic,
      pokemon.detail.genderRatio
    );
    pokemon.moves = pokemonBase.moves;
    pokemon.stats = this.generateStatsData(
      pokemonBase.stats,
      pokemon.basic.nature,
      pokemon.detail.growthRate
    );
    pokemon.ability = this.generateAbilityData(pokemonBase.ability);

    await this.logger.info({
      message: "Pokemon generated",
      data: { pokemon },
      method: "PokemonGenerator.generate",
    });

    return pokemon;
  }

  private generateBasicData(
    basicData: PokemonBasicBaseData,
    genderRatio: number
  ): PokemonBasicData {
    const gender =
      Math.random() * 100 < genderRatio ? Gender.Male : Gender.Female;
    return {
      id: crypto.randomUUID(),
      name: basicData.name,
      types: basicData.types,
      nature: getRandomToList(Object.values(Natures)),
      gender: gender,
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
    nature: Natures,
    growthRate: GrowthRates
  ): PokemonStatsData {
    const level = getRandomNumber(1, 5); //TODO: El nivel dependerá de un valor aleatorio dado por la zona
    return this.statCalculator.generateStats({
      baseStats,
      nature,
      level,
      growthRate,
    });
  }
}
