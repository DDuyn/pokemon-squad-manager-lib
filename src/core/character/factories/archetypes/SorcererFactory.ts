import { injectable } from "inversify";
import { ArchetypeFactoryGenerator } from "./ArchetypeFactory";

@injectable()
export class SorcererFactory extends ArchetypeFactoryGenerator {
  protected attributeRanges = {
    primary: {
      strength: { min: 5, max: 10 },
      dexterity: { min: 5, max: 10 },
      intelligence: { min: 10, max: 20 },
      vitality: { min: 5, max: 10 },
    },
    combat: {
      energy: { min: 10, max: 20 },
      physicalDamage: { min: 5, max: 10 },
      physicalDefense: { min: 5, max: 10 },
      magicalDamage: { min: 10, max: 20 },
      magicalDefense: { min: 5, max: 10 },
      agility: { min: 5, max: 10 },
    },
  };
}
