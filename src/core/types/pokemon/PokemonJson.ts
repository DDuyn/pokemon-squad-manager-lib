import { PokemonStatsBaseData } from "./PokemonStats";
import { PokemonTypes } from "./PokemonTypes";

export type PokemonJson = {
  name: string;
  types: PokemonTypes;
  baseStats: PokemonStatsBaseData;
  abilities: string[];
  genderRatio: number;
  catchRate: number;
  eggCycles: number;
  baseExp: number;
};
