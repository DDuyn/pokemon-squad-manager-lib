import { CalculateExperienceStat } from "@core/interfaces/experience/CalculateExperienceStat";
import { GrowthRates } from "../pokemon/PokemonGrowthRates";

export type CalculateExperienceFactoryRegistry = {
  [key in GrowthRates]: CalculateExperienceStat;
};
