import { PokemonBaseData } from "../../types/pokemon/PokemonData";

export interface PokemonRepository {
  getPokemons(names: string[]): Promise<PokemonBaseData[]>;
  getPokemon(name: string): Promise<PokemonBaseData>;
}
