import { PokemonJson } from "@core/types/pokemon/PokemonJson";
import {
  EnemyPokemon,
  OwnPokemon,
  PokemonBaseData,
} from "../../types/pokemon/PokemonData";

export interface PokemonMapper {
  toPokemonBase(pokemonData: PokemonJson): PokemonBaseData;
  toOwnPokemon(enemyPokemon: EnemyPokemon): OwnPokemon;
}
