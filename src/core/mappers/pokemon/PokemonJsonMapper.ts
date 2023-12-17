import { injectable } from "inversify";
import { PokemonBaseData } from "../../types/pokemon/PokemonData";
import { PokemonJson } from "../../types/pokemon/PokemonJson";
import { PokemonMapper } from "./PokemonMapper";

@injectable()
export class PokemonJsonMapper implements PokemonMapper<PokemonJson> {
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
      },
      ability: {
        availableAbilities: pokemonData.abilities,
      },
      stats: pokemonData.baseStats,
      moves: {
        selectedMoves: [],
        learnableMoves: [],
      },
    };
  }
}
