import { GrowthRates } from "./PokemonGrowthRates";

export type PokemonDetailData = {
  growthRate: GrowthRates;
} & PokemonDetailBaseData;

export type PokemonDetailBaseData = {
  catchRate: number;
  genderRatio: number;
  eggCycles: number;
  baseExperience: number;
};
