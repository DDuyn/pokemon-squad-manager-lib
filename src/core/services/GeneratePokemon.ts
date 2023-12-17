import { TYPES } from "@config/Types";
import { Gender } from "@core/types/pokemon/PokemonGender";
import { getRandomNumber } from "@shared/services/GetRandomNumber";
import { getRandomToList } from "@shared/services/GetRandomToList";
import { Logger } from "@shared/services/logger/interfaces/Logger";
import { inject, injectable } from "inversify";
import { GenerateStats } from "../interfaces/experience/GenerateStats";
import { PokemonRepository } from "../repositories/pokemon/PokemonRepository";
import {
  PokemonAbilitiesBaseData,
  PokemonAbilitiesData,
} from "../types/pokemon/PokemonAbilities";
import {
  PokemonBasicBaseData,
  PokemonBasicData,
} from "../types/pokemon/PokemonBasic";
import { Pokemon } from "../types/pokemon/PokemonData";
import {
  PokemonDetailBaseData,
  PokemonDetailData,
} from "../types/pokemon/PokemonDetail";
import { GrowthRates } from "../types/pokemon/PokemonGrowthRates";
import { Natures } from "../types/pokemon/PokemonNatures";
import {
  PokemonStatsBaseData,
  PokemonStatsData,
} from "../types/pokemon/PokemonStats";

@injectable()
export class GeneratePokemon {
  constructor(
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.PokemonRepository)
    private readonly repository: PokemonRepository,
    @inject(TYPES.GenerateStats)
    private readonly generatePokemonStats: GenerateStats
  ) {}

  async execute(name: string): Promise<Pokemon> {
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
      method: "GeneratePokemon.execute",
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
    return this.generatePokemonStats.execute({
      baseStats,
      nature,
      level,
      growthRate,
    });
  }
}
