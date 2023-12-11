import { RangeNumber } from "@core/shared/types";

export type PokemonStats = {
  baseStats: PokemonBaseStats;
  level: number;
  currentExperience: number;
  nextLevelExperience: number;
};

export type PokemonBaseStats = {
  health: Stat;
  attack: Stat;
  defense: Stat;
  specialAttack: Stat;
  specialDefense: Stat;
  speed: Stat;
};

export type Stat = {
  stat: number;
  iv: number;
  ev: number;
};

export type PokemonTypeStats = {
  stat: RangeNumber;
  iv: RangeNumber;
  ev: RangeNumber;
};

export type PokemonTypeStatsRanges = {
  health: PokemonTypeStats;
  attack: PokemonTypeStats;
  defense: PokemonTypeStats;
  specialAttack: PokemonTypeStats;
  specialDefense: PokemonTypeStats;
  speed: PokemonTypeStats;
};
