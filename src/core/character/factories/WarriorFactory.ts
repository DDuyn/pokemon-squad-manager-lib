import { injectable } from "inversify";
import { AttributeCategories } from "../types/Attribute";
import { ArchetypeFactoryGenerator } from "./ArchetypeFactory";

@injectable()
export class WarriorFactory extends ArchetypeFactoryGenerator {
  protected attributeRanges: AttributeCategories = {
    primary: {
      strength: { min: 10, max: 20 },
      dexterity: { min: 5, max: 10 },
      intelligence: { min: 5, max: 10 },
      vitality: { min: 10, max: 20 },
    },
    combat: {
      energy: { min: 5, max: 10 },
      physicalDamage: { min: 5, max: 10 },
      physicalDefense: { min: 5, max: 10 },
      magicalDamage: { min: 5, max: 10 },
      magicalDefense: { min: 5, max: 10 },
      agility: { min: 5, max: 10 },
    },
  };
}
