import { getRandomNumber } from "@shared/services";
import { injectable } from "inversify";
import { ArchetypeFactory } from "../interfaces/ArchetypeFactory";
import { AttributeCategories } from "../types/Attribute";
import {
  CharacterAttributes,
  CombatAttributes,
  PrimaryAttributes,
  UtilityAttributes,
} from "../types/CharacterAttributes";

@injectable()
export abstract class ArchetypeFactoryGenerator implements ArchetypeFactory {
  protected abstract attributeRanges: AttributeCategories;

  generate(): CharacterAttributes {
    return this.generateAttributes();
  }

  protected generateAttributes(): CharacterAttributes {
    return {
      utility: this.generateUtilityAttributes(),
      primary:
        this.generateArchetypeAttributes().primary || ({} as PrimaryAttributes),
      combat:
        this.generateArchetypeAttributes().combat || ({} as CombatAttributes),
    };
  }

  protected generateUtilityAttributes(): UtilityAttributes {
    return {
      level: 1,
      totalExperience: 0,
      neededExperience: 100,
    };
  }

  private generateArchetypeAttributes(): Partial<CharacterAttributes> {
    const vitality = getRandomNumber(
      this.attributeRanges.primary.vitality.min,
      this.attributeRanges.primary.vitality.max
    );
    return {
      primary: {
        strength: getRandomNumber(
          this.attributeRanges.primary.strength.min,
          this.attributeRanges.primary.strength.max
        ),
        dexterity: getRandomNumber(
          this.attributeRanges.primary.dexterity.min,
          this.attributeRanges.primary.dexterity.max
        ),
        intelligence: getRandomNumber(
          this.attributeRanges.primary.intelligence.min,
          this.attributeRanges.primary.intelligence.max
        ),
        vitality: vitality,
      },
      combat: {
        health: vitality,
        energy: getRandomNumber(
          this.attributeRanges.combat.energy.min,
          this.attributeRanges.combat.energy.max
        ),
        physicalDamage: getRandomNumber(
          this.attributeRanges.combat.physicalDamage.min,
          this.attributeRanges.combat.physicalDamage.max
        ),
        physicalDefense: getRandomNumber(
          this.attributeRanges.combat.physicalDefense.min,
          this.attributeRanges.combat.physicalDefense.max
        ),
        magicalDamage: getRandomNumber(
          this.attributeRanges.combat.magicalDamage.min,
          this.attributeRanges.combat.magicalDamage.max
        ),
        magicalDefense: getRandomNumber(
          this.attributeRanges.combat.magicalDefense.min,
          this.attributeRanges.combat.magicalDefense.max
        ),
        agility: getRandomNumber(
          this.attributeRanges.combat.agility.min,
          this.attributeRanges.combat.agility.max
        ),
      },
    };
  }
}
