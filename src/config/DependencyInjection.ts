import { ArchetypeFactory } from "@core/character/interfaces/ArchetypeFactory";
import {
  Archetype,
  ArchetypeFactoryRegistry,
} from "@core/character/types/Archetype";
import { Container } from "inversify";
import "reflect-metadata";
import { CharacterFactory } from "../core/character/factories/CharacterFactory";
import { SorcererFactory } from "../core/character/factories/SorcererFactory";
import { WarriorFactory } from "../core/character/factories/WarriorFactory";
import { FileLogger } from "../core/logger/FileLogger";
import { Logger } from "../core/logger/interfaces/Logger";
import { TYPES } from "./Types";

const container = new Container();
container.bind<Logger>(TYPES.Logger).to(FileLogger);
container.bind<CharacterFactory>(TYPES.CharacterFactory).to(CharacterFactory);
container.bind<ArchetypeFactory>(TYPES.WarriorFactory).to(WarriorFactory);
container.bind<ArchetypeFactory>(TYPES.SorcererFactory).to(SorcererFactory);

const archetypeFactoryRegistry: ArchetypeFactoryRegistry = {
  [Archetype.Warrior]: container.get<ArchetypeFactory>(TYPES.WarriorFactory),
  [Archetype.Sorcerer]: container.get<ArchetypeFactory>(TYPES.SorcererFactory),
  [Archetype.Druid]: container.get<ArchetypeFactory>(TYPES.SorcererFactory),
};

container
  .bind<ArchetypeFactoryRegistry>(TYPES.ArchetypeFactoryRegistry)
  .toConstantValue(archetypeFactoryRegistry);

export default container;
