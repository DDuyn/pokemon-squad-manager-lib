import {
  PokemonAbilitiesBaseData,
  PokemonAbilitiesData,
} from "./PokemonAbilities";
import { PokemonBasicBaseData, PokemonBasicData } from "./PokemonBasic";
import { PokemonDetailBaseData, PokemonDetailData } from "./PokemonDetail";
import { PokemonMovesData } from "./PokemonMoves";
import { PokemonStatsBaseData, PokemonStatsData } from "./PokemonStats";

export type Pokemon = {
  basic: PokemonBasicData;
  ability: PokemonAbilitiesData;
  moves: PokemonMovesData;
  stats: PokemonStatsData;
  detail: PokemonDetailData;
};

export type PokemonBaseData = {
  basic: PokemonBasicBaseData;
  ability: PokemonAbilitiesBaseData;
  moves: PokemonMovesData;
  stats: PokemonStatsBaseData;
  detail: PokemonDetailBaseData;
};
