import { GrowthRates } from "@core/pokemon/types/pokemon/PokemonGrowthRates";
import { Natures } from "@core/pokemon/types/pokemon/PokemonNatures";
import {
  PokemonStatsBaseData,
  PokemonStatsData,
} from "@core/pokemon/types/pokemon/PokemonStats";

export interface StatCalculator {
  generateStats(data: {
    baseStats: PokemonStatsBaseData;
    nature: Natures;
    level: number;
    growthRate: GrowthRates;
  }): PokemonStatsData;
}
