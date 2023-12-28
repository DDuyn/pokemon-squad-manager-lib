import {
  PokemonAbilitiesBaseData,
  PokemonAbilitiesData,
} from "./PokemonAbilities";
import { PokemonBasicBaseData, PokemonBasicData } from "./PokemonBasic";
import { PokemonDetailBaseData, PokemonDetailData } from "./PokemonDetail";
import { PokemonMovesData } from "./PokemonMoves";
import { PokemonStatsBaseData, PokemonStatsData } from "./PokemonStats";

export type EnemyPokemon = {
  currentHealth: number;
  status: string;
  isWild: boolean;
  isFainted: boolean;
} & Pokemon;

export type OwnPokemon = {
  currentHealth: number;
  status: string;
  isParticipating: boolean;
  partyPosition: number;
  isFainted: boolean;
} & Pokemon;

export type Pokemon = {
  base: PokemonStatsBaseData;
  basic: PokemonBasicData;
  ability: PokemonAbilitiesData;
  moves: PokemonMovesData;
  attributes: PokemonStatsData;
  detail: PokemonDetailData;
};

export type PokemonBaseData = {
  basic: PokemonBasicBaseData;
  ability: PokemonAbilitiesBaseData;
  moves: PokemonMovesData;
  attributes: PokemonStatsBaseData;
  detail: PokemonDetailBaseData;
};
