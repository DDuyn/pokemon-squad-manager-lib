import { PokemonJson } from "../models/PokemonTypes";

export interface PokemonRepository {
  getPokemon(name: string): Promise<PokemonJson>;
}
