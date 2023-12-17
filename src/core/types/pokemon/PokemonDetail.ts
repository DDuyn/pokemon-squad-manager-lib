import { GrowthRates } from "./PokemonGrowthRates";

export type PokemonDetailData = {
  catchRate: number;
  genderRatio: number;
  growthRate: GrowthRates;
  eggCycles: number;
};

export type PokemonDetailBaseData = {
  catchRate: number;
  genderRatio: number;
  eggCycles: number;
};
