import { CalculateExperienceFactory } from "@core/factories/experience/CalculateExperienceFactory";
import { CalculateErraticExperience } from "@core/factories/experience/services/CalculateErraticExperience";
import { CalculateFastExperience } from "@core/factories/experience/services/CalculateFastExperience";
import { CalculateFluctuatingExperience } from "@core/factories/experience/services/CalculateFluctuatingExperience";
import { CalculateMediumFastExperience } from "@core/factories/experience/services/CalculateMediumFastExperience";
import { CalculateMediumSlowExperience } from "@core/factories/experience/services/CalculateMediumSlowExperience";
import { CalculateSlowExperience } from "@core/factories/experience/services/CalculateSlowExperience";
import { CalculateExperienceStat } from "@core/interfaces/experience/CalculateExperienceStat";
import { PokemonJsonMapper } from "@core/mappers/pokemon/PokemonJsonMapper";
import { PokemonMapper } from "@core/mappers/pokemon/PokemonMapper";
import { LocationJsonRepository } from "@core/repositories/location/LocationJsonRepository";
import { LocationRepository } from "@core/repositories/location/LocationRepository";
import { GeneratePokemon } from "@core/services/GeneratePokemon";
import { GeneratePokemonStats } from "@core/services/GeneratePokemonStats";
import { GetAvailablePokemons } from "@core/services/GetAvailablePokemon";
import { CalculateExperienceFactoryRegistry } from "@core/types/experience/ExperienceCalculatorRegistry";
import { GrowthRates } from "@core/types/pokemon/PokemonGrowthRates";
import { PokemonJson } from "@core/types/pokemon/PokemonJson";
import { Cache } from "@shared/services/cache/Cache";
import { JsonCache } from "@shared/services/cache/JsonCache";
import { FileLogger } from "@shared/services/logger/FileLogger";
import { Logger } from "@shared/services/logger/interfaces/Logger";
import { JsonReader } from "@shared/services/reader/JsonReader";
import { Reader } from "@shared/services/reader/Reader";
import { Container } from "inversify";
import "reflect-metadata";
import { PokemonJsonRepository } from "../core/repositories/pokemon/PokemonJsonRepository";
import { PokemonRepository } from "../core/repositories/pokemon/PokemonRepository";
import { TYPES } from "./Types";

//TODO: Refactor para modularizar la inyección de dependencias
const container = new Container();
container.bind<Logger>(TYPES.Logger).to(FileLogger);
container.bind<GeneratePokemon>(TYPES.GeneratePokemon).to(GeneratePokemon);
container
  .bind<PokemonMapper<PokemonJson>>(TYPES.PokemonMapper)
  .to(PokemonJsonMapper);
container.bind<Reader>(TYPES.Reader).to(JsonReader);
container
  .bind<PokemonRepository>(TYPES.PokemonRepository)
  .to(PokemonJsonRepository);
container.bind<Cache<PokemonJson>>(TYPES.Cache).to(JsonCache);

container
  .bind<CalculateExperienceFactory>(TYPES.CalculateExperienceFactory)
  .to(CalculateExperienceFactory);
container
  .bind<GeneratePokemonStats>(TYPES.GeneratePokemonStats)
  .to(GeneratePokemonStats);

container
  .bind<CalculateExperienceStat>(TYPES.CalculateErraticExperience)
  .to(CalculateErraticExperience);
container
  .bind<CalculateExperienceStat>(TYPES.CalculateSlowExperience)
  .to(CalculateSlowExperience);
container
  .bind<CalculateExperienceStat>(TYPES.CalculateMediumSlowExperience)
  .to(CalculateMediumSlowExperience);
container
  .bind<CalculateExperienceStat>(TYPES.CalculateFluctuatingExperience)
  .to(CalculateFluctuatingExperience);
container
  .bind<CalculateExperienceStat>(TYPES.CalculateMediumFastExperience)
  .to(CalculateMediumFastExperience);
container
  .bind<CalculateExperienceStat>(TYPES.CalculateFastExperience)
  .to(CalculateFastExperience);

const calculateExperienceRegistry: CalculateExperienceFactoryRegistry = {
  [GrowthRates.Erratic]: container.get<CalculateExperienceStat>(
    TYPES.CalculateErraticExperience
  ),
  [GrowthRates.Fast]: container.get<CalculateExperienceStat>(
    TYPES.CalculateFastExperience
  ),
  [GrowthRates.Fluctuating]: container.get<CalculateExperienceStat>(
    TYPES.CalculateFluctuatingExperience
  ),
  [GrowthRates.MediumFast]: container.get<CalculateExperienceStat>(
    TYPES.CalculateMediumFastExperience
  ),
  [GrowthRates.MediumSlow]: container.get<CalculateExperienceStat>(
    TYPES.CalculateMediumSlowExperience
  ),
  [GrowthRates.Slow]: container.get<CalculateExperienceStat>(
    TYPES.CalculateSlowExperience
  ),
};

container
  .bind<CalculateExperienceFactoryRegistry>(
    TYPES.CalculateExperienceFactoryRegistry
  )
  .toConstantValue(calculateExperienceRegistry);

container
  .bind<LocationRepository>(TYPES.LocationRepository)
  .to(LocationJsonRepository);

container
  .bind<GetAvailablePokemons>(TYPES.GetAvailablePokemons)
  .to(GetAvailablePokemons);

export default container;
