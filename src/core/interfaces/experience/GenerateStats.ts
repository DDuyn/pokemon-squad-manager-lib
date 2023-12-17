import { GrowthRates } from "@core/types/pokemon/PokemonGrowthRates";
import { Natures } from "@core/types/pokemon/PokemonNatures";
import {
  PokemonStatsBaseData,
  PokemonStatsData,
} from "@core/types/pokemon/PokemonStats";

export interface GenerateStats {
  execute(data: {
    baseStats: PokemonStatsBaseData;
    nature: Natures;
    level: number;
    growthRate: GrowthRates;
  }): PokemonStatsData;
}
