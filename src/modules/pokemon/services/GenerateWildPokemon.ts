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
    private readonly pokemonBuilder: PokemonBuilder
  ) {}

  async execute(name: string): Promise<Pokemon> {
    //TODO: Get available pokemon to zone
    //TODO: Get level range and get random level
    //TODO: Get random pokemon from available pokemon
    const pokemonData = await this.pokemonRepository.getPokemon(name);

    const pokemonRequest = this.pokemonBuilder
      .setPokemonData(pokemonData)
      .setId()
      .setName(name)
      .setIsWild()
      .setGender()
      .setAbility()
      .setNature()
      .setDetailInfo()
      .setMoves()
      .setStats(1)
      .build();

    return new Pokemon(pokemonRequest);
  }
}
