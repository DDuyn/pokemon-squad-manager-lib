import { LOCATION_DI_TYPES } from "@location/config/DependencyInjection";
import { PokemonEncounter } from "@location/models/LocationTypes";
import { GetCycleName } from "@location/services/GetCycleName";
import { GetLocationById } from "@location/services/GetLocationById";
import { SHARED_DI_TYPES } from "@shared/config/DependencyInjection";
import { getRandomNumber } from "@shared/services/GetRandomNumber";
import { getRandomToList } from "@shared/services/GetRandomToList";
import { Logger } from "@shared/services/logger/interfaces/Logger";
import { inject, injectable } from "inversify";
import { POKEMON_DI_TYPES } from "../config/DependencyInjection";
import { PokemonBuilder } from "../factories/PokemonBuilder";
import { Pokemon } from "../models/Pokemon";
import { PokemonRepository } from "../repositories/PokemonRepository";

@injectable()
export class GenerateWildPokemon {
  constructor(
    @inject(POKEMON_DI_TYPES.PokemonRepository)
    private readonly pokemonRepository: PokemonRepository,
    @inject(POKEMON_DI_TYPES.PokemonBuilder)
    private readonly pokemonBuilder: PokemonBuilder,
    @inject(LOCATION_DI_TYPES.GetLocationById)
    private readonly getLocationById: GetLocationById,
    @inject(LOCATION_DI_TYPES.GetCycleName)
    private readonly getCycleName: GetCycleName,
    @inject(SHARED_DI_TYPES.Logger) private readonly logger: Logger
  ) {}

  async execute(locationName: string, routeName: string): Promise<Pokemon> {
    const location = await this.getLocationById.execute(locationName);
    const cycle = await this.getCycleName.execute();

    const pokemonsAvailables = location.getPokemons(routeName, cycle);
    const pokemonName = this.getRandomWildPokemon(pokemonsAvailables);
    const levelRange = location.getLevelRange(routeName);
    const level = getRandomNumber(levelRange.min, levelRange.max);

    const pokemonData = await this.pokemonRepository.getPokemon(pokemonName);
    const pokemon = await (
      await this.pokemonBuilder
        .setPokemonData(pokemonData)
        .setId()
        .setName(pokemonName)
        .setIsWild()
        .setTypes()
        .setGender()
        .setAbility()
        .setNature()
        .setDetailInfo()
        .setMoves()
        .setStats(level)
    ).build();

    await this.logger.info({
      message: `Pokemon ${pokemonName} generated`,
      data: { pokemon },
      method: "GenerateWildPokemon.execute",
    });

    return pokemon;
  }

  private getRandomWildPokemon(availablePokemons: PokemonEncounter[]): string {
    const totalencounterRate = availablePokemons.reduce(
      (sum, pokemon) => sum + pokemon.encounterRate,
      0
    );

    let random = Math.floor(Math.random() * totalencounterRate);

    for (const pokemon of availablePokemons) {
      if (random <= 0) return pokemon.name;
      random -= pokemon.encounterRate;
    }

    //TODO: Crear fichero de ratio de encuentro de los pokemon
    const pokemonEncounter =
      getRandomToList<PokemonEncounter>(availablePokemons);
    return pokemonEncounter.name;
  }
}
