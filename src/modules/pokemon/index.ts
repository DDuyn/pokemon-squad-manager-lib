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
import { CapturePokemon } from "./features/CapturePokemon";
import { GainExperiencePokemon } from "./features/GainExperiencePokemon";
import { GenerateWildPokemon } from "./features/GenerateWildPokemon";
import { GrowthRates, PokemonJson } from "./models/PokemonTypes";
import { PokemonJsonRepository } from "./repositories/PokemonJsonRepository";
import { PokemonRepository } from "./repositories/PokemonRepository";
import { CalculateAttributes } from "./services/CalculateAttributes";
import { CalculateExperience } from "./services/CalculateExperience";
import { GeneratePokemonStats } from "./services/GeneratePokemonStats";
import { LevelUpPokemon } from "./services/LevelUpPokemon";
import { UpgradePokemonStats } from "./services/UpgradePokemonStats";

export * as PokemonTypes from "./models/PokemonTypes";

const pokemonModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<GenerateWildPokemon>(POKEMON_DI_TYPES.GenerateWildPokemon).to(
    GenerateWildPokemon
  );
  bind<CapturePokemon>(POKEMON_DI_TYPES.CapturePokemon).to(CapturePokemon);
  bind<PokemonRepository>(POKEMON_DI_TYPES.PokemonRepository).to(
    PokemonJsonRepository
  );
  bind<Cache<PokemonJson>>(SHARED_DI_TYPES.Cache).to(JsonCache);
  bind<GeneratePokemonStats>(POKEMON_DI_TYPES.GeneratePokemonStats).to(
    GeneratePokemonStats
  );
  bind<CalculateExperience>(POKEMON_DI_TYPES.CalculateExperience).to(
    CalculateExperience
  );
  bind<CalculateAttributes>(POKEMON_DI_TYPES.CalculateAttributes).to(
    CalculateAttributes
  );
  bind<LevelUpPokemon>(POKEMON_DI_TYPES.LevelUpPokemon).to(LevelUpPokemon);
  bind<UpgradePokemonStats>(POKEMON_DI_TYPES.UpgradePokemonStats).to(
    UpgradePokemonStats
  );
  bind<GainExperiencePokemon>(POKEMON_DI_TYPES.GainExperiencePokemon).to(
    GainExperiencePokemon
  );
  bind<PokemonBuilder>(POKEMON_DI_TYPES.PokemonBuilder).to(PokemonBuilder);

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
