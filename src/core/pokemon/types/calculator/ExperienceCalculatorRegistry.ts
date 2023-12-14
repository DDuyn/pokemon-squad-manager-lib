import { ExperienceCalculator } from "@core/pokemon/services/calculator/experience/ExperienceCalculator";
import { GrowthRates } from "../pokemon/PokemonGrowthRates";

export type ExperienceCalculatorRegistry = {
  [key in GrowthRates]: ExperienceCalculator;
};
