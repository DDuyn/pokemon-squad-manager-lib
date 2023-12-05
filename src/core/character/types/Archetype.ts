import { ArchetypeFactory } from "../interfaces/ArchetypeFactory";

export enum Archetype {
  Warrior = "Warrior",
  Sorcerer = "Sorcerer",
  Druid = "Druid",
}

export type ArchetypeFactoryRegistry = {
  [key in Archetype]: ArchetypeFactory;
};
