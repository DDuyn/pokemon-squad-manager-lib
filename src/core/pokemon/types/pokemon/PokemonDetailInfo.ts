import { GrowthRates } from "./GrowthRates";

export type PokemonDetailedInfo = {
  catchRate: number;
  genderRatio: number;
  growthRate: GrowthRates;
  eggCycles: number;
};
