import { PokemonGenerator } from "@core/pokemon/services/generator/PokemonGenerator";
import { JsonReader } from "@core/shared/services/reader/JsonReader";
import { Container } from "inversify";
import "reflect-metadata";

import { LocationJsonRepository } from "@core/location/repository/LocationJsonRepository";
import { LocationRepository } from "@core/location/repository/LocationRepository";
import { GetAvailablePokemons } from "@core/location/services/GetAvailablePokemon";
import { PokemonJsonMapper } from "@core/pokemon/mappers/PokemonJsonMapper";
import { PokemonMapper } from "@core/pokemon/mappers/PokemonMapper";
import { PokemonStatCalculator } from "@core/pokemon/services/calculator/PokemonStatCalculator";
import { StatCalculator } from "@core/pokemon/services/calculator/StatCalculator";
import { ErraticExperienceCalculator } from "@core/pokemon/services/calculator/experience/ErraticExperienceCalculator";
import { ExperienceCalculator } from "@core/pokemon/services/calculator/experience/ExperienceCalculator";
import { ExperienceCalculatorFactory } from "@core/pokemon/services/calculator/experience/ExperienceCalculatorFactory";
import { FastExperienceCalculator } from "@core/pokemon/services/calculator/experience/FastExperienceCalculator";
import { FluctuatingExperienceCalculator } from "@core/pokemon/services/calculator/experience/FluctuatingExperienceCalculator";
import { MediumSlowExperienceCalculator } from "@core/pokemon/services/calculator/experience/MediumSlowExperienceCalculator";
import { SlowExperienceCalculator } from "@core/pokemon/services/calculator/experience/SlowExperienceCalculator";
import { ExperienceCalculatorRegistry } from "@core/pokemon/types/calculator/ExperienceCalculatorRegistry";
import { GrowthRates } from "@core/pokemon/types/pokemon/PokemonGrowthRates";
import { PokemonJson } from "@core/pokemon/types/pokemon/PokemonJson";
import { Cache } from "@core/shared/services/cache/Cache";
import { JsonCache } from "@core/shared/services/cache/JsonCache";
import { FileLogger } from "@core/shared/services/logger/FileLogger";
import { Logger } from "@core/shared/services/logger/interfaces/Logger";
import { Reader } from "@core/shared/services/reader/Reader";
import { PokemonJsonRepository } from "../core/pokemon/repository/PokemonJsonRepository";
import { PokemonRepository } from "../core/pokemon/repository/PokemonRepository";
import { MediumFastExperienceCalculator } from "../core/pokemon/services/calculator/experience/MediumFastExperienceCalculator";
import { TYPES } from "./Types";

//TODO: Refactor para modularizar la inyección de dependencias
const container = new Container();
container.bind<Logger>(TYPES.Logger).to(FileLogger);
container.bind<PokemonGenerator>(TYPES.PokemonGenerator).to(PokemonGenerator);
container
  .bind<PokemonMapper<PokemonJson>>(TYPES.PokemonMapper)
  .to(PokemonJsonMapper);
container.bind<Reader>(TYPES.Reader).to(JsonReader);
container
  .bind<PokemonRepository>(TYPES.PokemonRepository)
  .to(PokemonJsonRepository);
container.bind<Cache<PokemonJson>>(TYPES.Cache).to(JsonCache);

container
  .bind<ExperienceCalculatorFactory>(TYPES.ExperienceCalculatorFactory)
  .to(ExperienceCalculatorFactory);
container.bind<StatCalculator>(TYPES.StatCalculator).to(PokemonStatCalculator);

container
  .bind<ExperienceCalculator>(TYPES.ErraticExperienceCalculator)
  .to(ErraticExperienceCalculator);
container
  .bind<ExperienceCalculator>(TYPES.SlowExperienceCalculator)
  .to(SlowExperienceCalculator);
container
  .bind<ExperienceCalculator>(TYPES.MediumSlowExperienceCalculator)
  .to(MediumSlowExperienceCalculator);
container
  .bind<ExperienceCalculator>(TYPES.FluctuatingExperienceCalculator)
  .to(FluctuatingExperienceCalculator);
container
  .bind<ExperienceCalculator>(TYPES.MediumFastExperienceCalculator)
  .to(MediumFastExperienceCalculator);
container
  .bind<ExperienceCalculator>(TYPES.FastExperienceCalculator)
  .to(FastExperienceCalculator);

const pokemonExperienceCalculator: ExperienceCalculatorRegistry = {
  [GrowthRates.Erratic]: container.get<ExperienceCalculator>(
    TYPES.ErraticExperienceCalculator
  ),
  [GrowthRates.Fast]: container.get<ExperienceCalculator>(
    TYPES.FastExperienceCalculator
  ),
  [GrowthRates.Fluctuating]: container.get<ExperienceCalculator>(
    TYPES.FluctuatingExperienceCalculator
  ),
  [GrowthRates.MediumFast]: container.get<ExperienceCalculator>(
    TYPES.MediumFastExperienceCalculator
  ),
  [GrowthRates.MediumSlow]: container.get<ExperienceCalculator>(
    TYPES.MediumSlowExperienceCalculator
  ),
  [GrowthRates.Slow]: container.get<ExperienceCalculator>(
    TYPES.SlowExperienceCalculator
  ),
};

container
  .bind<ExperienceCalculatorRegistry>(TYPES.ExperienceCalculatorRegistry)
  .toConstantValue(pokemonExperienceCalculator);

container
  .bind<LocationRepository>(TYPES.LocationRepository)
  .to(LocationJsonRepository);

container
  .bind<GetAvailablePokemons>(TYPES.GetAvailablePokemons)
  .to(GetAvailablePokemons);

export default container;
