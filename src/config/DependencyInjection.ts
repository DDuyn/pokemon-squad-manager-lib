import { PokemonGenerator } from "@core/pokemon/services/PokemonGenerator";
import { JsonReader } from "@core/shared/services/reader/JsonReader";
import { Container } from "inversify";
import "reflect-metadata";

import { FileLogger } from "@core/logger/FileLogger";
import { Logger } from "@core/logger/interfaces/Logger";
import { PokemonJsonMapper } from "@core/pokemon/mappers/PokemonJsonMapper";
import { PokemonMapper } from "@core/pokemon/mappers/PokemonMapper";
import { PokemonJson } from "@core/pokemon/types/pokemon/PokemonJson";
import { Cache } from "@core/shared/services/cache/Cache";
import { JsonCache } from "@core/shared/services/cache/JsonCache";
import { Reader } from "@core/shared/services/reader/Reader";
import { PokemonJsonRepository } from "../core/pokemon/repository/PokemonJsonRepository";
import { PokemonRepository } from "../core/pokemon/repository/PokemonRepository";
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

/*
const archetypeFactoryRegistry: ArchetypeFactoryRegistry = {
  [Archetype.Warrior]: container.get<ArchetypeFactory>(TYPES.WarriorFactory),
  [Archetype.Sorcerer]: container.get<ArchetypeFactory>(TYPES.SorcererFactory),
  [Archetype.Druid]: container.get<ArchetypeFactory>(TYPES.DruidFactory),
};

container
  .bind<ArchetypeFactoryRegistry>(TYPES.ArchetypeFactoryRegistry)
  .toConstantValue(archetypeFactoryRegistry);
*/

export default container;
