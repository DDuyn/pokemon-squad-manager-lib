import { Pokemon } from "../types/Pokemon";

export interface PokemonMapper<T> {
  toPokemon(pokemon: T): Promise<Pokemon>;
}
