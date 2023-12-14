export const TYPES = {
  Logger: Symbol.for("Logger"),
  PokemonGenerator: Symbol.for("PokemonGenerator"),
  PokemonMapper: Symbol.for("PokemonMapper"),
  Reader: Symbol.for("Reader"),
  Cache: Symbol.for("Cache"),
  PokemonRepository: Symbol.for("PokemonRepository"),
  ExperienceCalculatorFactory: Symbol.for("ExperienceCalculatorFactory"),
  ExperienceCalculatorRegistry: Symbol.for("ExperienceCalculatorRegistry"),
  ErraticExperienceCalculator: Symbol.for("ErraticExperienceCalculator"),
  FastExperienceCalculator: Symbol.for("FastExperienceCalculator"),
  FluctuatingExperienceCalculator: Symbol.for(
    "FluctuatingExperienceCalculator"
  ),
  MediumFastExperienceCalculator: Symbol.for("MediumFastExperienceCalculator"),
  MediumSlowExperienceCalculator: Symbol.for("MediumSlowExperienceCalculator"),
  SlowExperienceCalculator: Symbol.for("SlowExperienceCalculator"),
  StatCalculator: Symbol.for("StatCalculator"),
  ExperienceCalculator: Symbol.for("ExperienceCalculator"),
};
