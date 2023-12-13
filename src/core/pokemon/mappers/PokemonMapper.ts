import { PokemonBaseData } from "../types/pokemon/PokemonData";

export interface PokemonMapper<T> {
  toPokemonBase(pokemonData: T): PokemonBaseData;
}
