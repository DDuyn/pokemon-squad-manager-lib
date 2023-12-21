import { TYPES } from "@config/Types";
import { LevelRange } from "@core/types/location/Location";
import { Gender } from "@core/types/pokemon/PokemonGender";
import { getRandomToList } from "@shared/services/GetRandomToList";
import { Logger } from "@shared/services/logger/interfaces/Logger";
import { inject, injectable } from "inversify";
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
import { GeneratePokemonStats } from "./GeneratePokemonStats";

@injectable()
export class GeneratePokemon {
  constructor(
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.PokemonRepository)
    private readonly repository: PokemonRepository,
    @inject(TYPES.GeneratePokemonStats)
    private readonly generatePokemonStats: GeneratePokemonStats
  ) {}

  async execute(name: string, levelRange: LevelRange): Promise<Pokemon> {
    const pokemonBase = await this.repository.getPokemon(name);
    const pokemon = {} as Pokemon;

    pokemon.base = pokemonBase.attributes;
    pokemon.detail = this.generateDetailData(pokemonBase.detail);
    pokemon.basic = this.generateBasicData(
      pokemonBase.basic,
      pokemon.detail.genderRatio
    );
    pokemon.moves = pokemonBase.moves;
    pokemon.attributes = await this.generatePokemonStats.execute(
      pokemon,
      levelRange
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
      ...basicData,
      nature: getRandomToList(Object.values(Natures)),
      gender: gender,
    };
  }

  private generateDetailData(
    detailData: PokemonDetailBaseData
  ): PokemonDetailData {
    return {
      ...detailData,
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
}
