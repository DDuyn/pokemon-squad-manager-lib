import { Pokemon } from "../types/Pokemon";

export interface PokemonRepository {
  //TODO: Refactor. Cambiar tipado del parámetro de entrada por tipo Zone que contendra
  //TODO: un listado con los nombres de pokemons disponibles en esa zona
  getPokemons(zone: string[]): Promise<Pokemon[]>;
}
