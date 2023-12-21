import { PokemonJson } from "@core/types/pokemon/PokemonJson";
import { injectable } from "inversify";
import {
  EnemyPokemon,
  OwnPokemon,
  PokemonBaseData,
} from "../../types/pokemon/PokemonData";
import { PokemonMapper } from "./PokemonMapper";

@injectable()
export class PokemonJsonMapper implements PokemonMapper {
  toPokemonBase(pokemonData: PokemonJson): PokemonBaseData {
    return {
      basic: {
        name: pokemonData.name,
        types: pokemonData.types,
      },
      detail: {
        catchRate: pokemonData.catchRate,
        eggCycles: pokemonData.eggCycles,
        genderRatio: pokemonData.genderRatio,
        baseExperience: pokemonData.baseExp,
      },
      ability: {
        availableAbilities: pokemonData.abilities,
      },
      attributes: pokemonData.baseStats,
      moves: {
        selectedMoves: [],
        learnableMoves: [],
      },
    };
  }

  toOwnPokemon(enemyPokemon: EnemyPokemon): OwnPokemon {
    return {
      ...enemyPokemon,
      isParticipating: false,
      partyPosition: 0,
    };
  }
}
