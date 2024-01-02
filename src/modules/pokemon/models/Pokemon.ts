import {
  Gender,
  Natures,
  PokemonAbilities,
  PokemonCombatStats,
  PokemonDetailInfo,
  PokemonMovesData,
  PokemonStats,
  PokemonStatsBase,
  PokemonTypes,
} from "./PokemonTypes";

export type Pokemon = {
  id: string;
  name: string;
  types: PokemonTypes;
  nature: Natures;
  gender: Gender;
  detailInfo: PokemonDetailInfo;
  stats: {
    base: PokemonStatsBase;
    current: PokemonStats;
  };
  moves: PokemonMovesData;
  ability: PokemonAbilities;
  isWild: boolean;
  combatStats: PokemonCombatStats;
};
