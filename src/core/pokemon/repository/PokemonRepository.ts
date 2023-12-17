import { PokemonBaseData } from "../types/pokemon/PokemonData";

export interface PokemonRepository {
  //TODO: Refactor. Cambiar tipado del parámetro de entrada por tipo Zone que contendra
  //TODO: un listado con los nombres de pokemons disponibles en esa zona
  getPokemons(names: string[]): Promise<PokemonBaseData[]>;
  getPokemon(name: string): Promise<PokemonBaseData>;
}
