import { PokemonGenerator } from "@core/pokemon/PokemonGenerator";
import { PokemonMapper } from "@core/pokemon/mappers/PokemonMapper";
import { Container } from "inversify";
import "reflect-metadata";
import { FileLogger } from "../core/logger/FileLogger";
import { Logger } from "../core/logger/interfaces/Logger";
import { TYPES } from "./Types";

const container = new Container();
container.bind<Logger>(TYPES.Logger).to(FileLogger);
container.bind<PokemonGenerator>(TYPES.PokemonGenerator).to(PokemonGenerator);
container.bind<PokemonMapper>(TYPES.PokemonMapper).to(PokemonMapper);

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
