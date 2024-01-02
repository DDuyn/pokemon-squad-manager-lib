import "reflect-metadata";

import { SHARED_DI_TYPES } from "@shared/config/DependencyInjection";
import { Cache } from "@shared/services/cache/Cache";
import { JsonCache } from "@shared/services/cache/JsonCache";
import { ContainerModule, interfaces } from "inversify";
import { POKEMON_DI_TYPES } from "./config/DependencyInjection";
import { PokemonBuilder } from "./factories/PokemonBuilder";
import { CalculateExperienceAttribute } from "./factories/experience/CalculateExperienceAttribute";
import {
  CalculateExperienceFactory,
  CalculateExperienceFactoryRegistry,
} from "./factories/experience/CalculateExperienceFactory";
import { CalculateErraticExperience } from "./factories/experience/services/CalculateErraticExperience";
import { CalculateFastExperience } from "./factories/experience/services/CalculateFastExperience";
import { CalculateFluctuatingExperience } from "./factories/experience/services/CalculateFluctuatingExperience";
import { CalculateMediumFastExperience } from "./factories/experience/services/CalculateMediumFastExperience";
import { CalculateMediumSlowExperience } from "./factories/experience/services/CalculateMediumSlowExperience";
import { CalculateSlowExperience } from "./factories/experience/services/CalculateSlowExperience";
import { GrowthRates, PokemonJson } from "./models/PokemonTypes";
import { PokemonJsonRepository } from "./repositories/PokemonJsonRepository";
import { PokemonRepository } from "./repositories/PokemonRepository";
import { GenerateWildPokemon } from "./services/GenerateWildPokemon";
import { PokemonStatsGenerator } from "./services/PokemonStatsGenerator";

export * as PokemonTypes from "./models/PokemonTypes";

const pokemonModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<GenerateWildPokemon>(GenerateWildPokemon).toSelf();
  bind<PokemonRepository>(POKEMON_DI_TYPES.PokemonRepository).to(
    PokemonJsonRepository
  );
  bind<Cache<PokemonJson>>(SHARED_DI_TYPES.Cache).to(JsonCache);
  bind<PokemonStatsGenerator>(POKEMON_DI_TYPES.PokemonStatsGenerator).to(
    PokemonStatsGenerator
  );
  bind<PokemonBuilder>(POKEMON_DI_TYPES.PokemonBuilder).to(PokemonBuilder);
  bind<GenerateWildPokemon>(POKEMON_DI_TYPES.GenerateWildPokemon).to(
    GenerateWildPokemon
  );

  bind<CalculateExperienceAttribute>(
    POKEMON_DI_TYPES.CalculateErraticExperience
  ).to(CalculateErraticExperience);
  bind<CalculateExperienceAttribute>(
    POKEMON_DI_TYPES.CalculateFastExperience
  ).to(CalculateFastExperience);
  bind<CalculateExperienceAttribute>(
    POKEMON_DI_TYPES.CalculateFluctuatingExperience
  ).to(CalculateFluctuatingExperience);
  bind<CalculateExperienceAttribute>(
    POKEMON_DI_TYPES.CalculateMediumFastExperience
  ).to(CalculateMediumFastExperience);
  bind<CalculateExperienceAttribute>(
    POKEMON_DI_TYPES.CalculateMediumSlowExperience
  ).to(CalculateMediumSlowExperience);
  bind<CalculateExperienceAttribute>(
    POKEMON_DI_TYPES.CalculateSlowExperience
  ).to(CalculateSlowExperience);
  bind<CalculateExperienceFactory>(
    POKEMON_DI_TYPES.CalculateExperienceFactory
  ).to(CalculateExperienceFactory);

  bind<CalculateExperienceFactoryRegistry>(
    POKEMON_DI_TYPES.CalculateExperienceFactoryRegistry
  ).toDynamicValue((context: interfaces.Context) => {
    return {
      [GrowthRates.Erratic]:
        context.container.get<CalculateExperienceAttribute>(
          POKEMON_DI_TYPES.CalculateErraticExperience
        ),
      [GrowthRates.Fast]: context.container.get<CalculateExperienceAttribute>(
        POKEMON_DI_TYPES.CalculateFastExperience
      ),
      [GrowthRates.Fluctuating]:
        context.container.get<CalculateExperienceAttribute>(
          POKEMON_DI_TYPES.CalculateFluctuatingExperience
        ),
      [GrowthRates.MediumFast]:
        context.container.get<CalculateExperienceAttribute>(
          POKEMON_DI_TYPES.CalculateMediumFastExperience
        ),
      [GrowthRates.MediumSlow]:
        context.container.get<CalculateExperienceAttribute>(
          POKEMON_DI_TYPES.CalculateMediumSlowExperience
        ),
      [GrowthRates.Slow]: context.container.get<CalculateExperienceAttribute>(
        POKEMON_DI_TYPES.CalculateSlowExperience
      ),
    };
  });
});

export default pokemonModule;
