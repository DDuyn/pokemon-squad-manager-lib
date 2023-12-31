import { Container } from "inversify";
import "reflect-metadata";

import { LocationJsonRepository } from "@core/repositories/location/LocationJsonRepository";
import { LocationRepository } from "@core/repositories/location/LocationRepository";

import { GainExperiencePokemon } from "@core/services_old/GainExperiencePokemon";
import { GetAvailablePokemons } from "@core/services_old/GetAvailablePokemon";
import pokemonModule from "../modules/pokemon";
import { FileLogger } from "../modules/shared/services/logger/FileLogger";
import { Logger } from "../modules/shared/services/logger/interfaces/Logger";
import { JsonReader } from "../modules/shared/services/reader/JsonReader";
import { Reader } from "../modules/shared/services/reader/Reader";
import { TYPES } from "./Types";

//TODO: Refactor para modularizar la inyección de dependencias
const container = new Container();
container.bind<Logger>(TYPES.Logger).to(FileLogger);
container.bind<Reader>(TYPES.Reader).to(JsonReader);

container.load(pokemonModule);

container
  .bind<LocationRepository>(TYPES.LocationRepository)
  .to(LocationJsonRepository);

container
  .bind<GetAvailablePokemons>(TYPES.GetAvailablePokemons)
  .to(GetAvailablePokemons);

container
  .bind<GainExperiencePokemon>(TYPES.GainExperiencePokemon)
  .to(GainExperiencePokemon);

export default container;
