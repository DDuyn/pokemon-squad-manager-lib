import { randomUUID } from "crypto";
import { inject, injectable } from "inversify";
import { getRandomToList } from "../../shared/services/GetRandomToList";
import { POKEMON_DI_TYPES } from "../config/DependencyInjection";
import { PokemonRequest } from "../models/Pokemon";
import {
  Gender,
  GrowthRates,
  Natures,
  PokemonJson,
} from "../models/PokemonTypes";
import { PokemonStatsGenerator } from "../services/PokemonStatsGenerator";

@injectable()
export class PokemonBuilder {
  private pokemonRequest: PokemonRequest = {} as PokemonRequest;
  private pokemonData: PokemonJson = {} as PokemonJson;

  constructor(
    @inject(POKEMON_DI_TYPES.PokemonStatsGenerator)
    private readonly pokemonStatsGenerator: PokemonStatsGenerator
  ) {}

  setPokemonData(pokemonData: PokemonJson): PokemonBuilder {
    this.pokemonData = pokemonData;
    return this;
  }

  setName(name: string): PokemonBuilder {
    this.pokemonRequest.name = name;
    return this;
  }

  setIsWild(): PokemonBuilder {
    this.pokemonRequest.isWild = true;
    return this;
  }

  setId(): PokemonBuilder {
    this.pokemonRequest.id = randomUUID();
    return this;
  }

  setGender(): PokemonBuilder {
    console.log(this.pokemonData);
    this.pokemonRequest.gender =
      Math.random() * 100 < this.pokemonData.genderRatio
        ? Gender.Male
        : Gender.Female;

    return this;
  }

  setDetailInfo(): PokemonBuilder {
    this.pokemonRequest.detailInfo = {
      catchRate: this.pokemonData.catchRate,
      eggCycles: this.pokemonData.eggCycles,
      baseExperience: this.pokemonData.baseExp,
      genderRatio: this.pokemonData.genderRatio,
      growthRate: getRandomToList<GrowthRates>(Object.values(GrowthRates)),
    };

    return this;
  }

  setAbility(): PokemonBuilder {
    this.pokemonRequest.ability = {
      selectedAbility: getRandomToList(this.pokemonData.abilities),
      availableAbilities: this.pokemonData.abilities,
    };

    return this;
  }

  setMoves(): PokemonBuilder {
    this.pokemonRequest.moves = { learnableMoves: [], selectedMoves: [] };
    return this;
  }

  setNature(): PokemonBuilder {
    this.pokemonRequest.nature = getRandomToList(Object.values(Natures));
    return this;
  }

  setStats(level: number): PokemonBuilder {
    const stats = this.pokemonStatsGenerator.execute({
      baseStats: this.pokemonData.baseStats,
      growthRate: this.pokemonRequest.detailInfo.growthRate,
      level,
      nature: this.pokemonRequest.nature,
    });

    this.pokemonRequest.stats = {
      base: this.pokemonData.baseStats,
      current: stats,
    };

    return this;
  }

  build(): PokemonRequest {
    return this.pokemonRequest;
  }
}
