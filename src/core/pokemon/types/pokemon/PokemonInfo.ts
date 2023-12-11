import { PokemonAbilities } from "./PokemonAbilities";
import { PokemonBasicInfo } from "./PokemonBasicInfo";
import { PokemonDetailedInfo } from "./PokemonDetailInfo";
import { PokemonInfoMoves } from "./PokemonMoves";
import { PokemonStats } from "./PokemonStats";

export type PokemonInfo = {
  basic: PokemonBasicInfo;
  ability: PokemonAbilities;
  moves: PokemonInfoMoves;
  stats: PokemonStats;
  detail: PokemonDetailedInfo;
};
