import { getRandomNumber } from "@shared/services/GetRandomNumber";
import { injectable } from "inversify";
import {
  NatureEffect,
  Natures,
  PokemonAttribute,
  PokemonAttributes,
  PokemonStatsBase,
  StatKey,
} from "../models/PokemonTypes";

type AttributeCalculator = (
  baseAttribute: number,
  attribute: PokemonAttribute,
  nature: Natures,
  level: number
) => Promise<number>;

@injectable()
export class CalculateAttributes {
  private attributeCalculators: { [key in StatKey]: AttributeCalculator } = {
    [StatKey.health]: this.calculateHealth.bind(this),
    [StatKey.attack]: this.calculateAttack.bind(this),
    [StatKey.defense]: this.calculateDefense.bind(this),
    [StatKey.specialAttack]: this.calculateSpecialAttack.bind(this),
    [StatKey.specialDefense]: this.calculateSpecialDefense.bind(this),
    [StatKey.speed]: this.calculateSpeed.bind(this),
  };

  async calculateAttributes(
    base: PokemonStatsBase,
    attributes: PokemonAttributes,
    nature: Natures,
    level: number
  ): Promise<PokemonAttributes> {
    for (const key in this.attributeCalculators) {
      if (this.attributeCalculators.hasOwnProperty(key)) {
        const attributeKey = key as keyof PokemonAttributes;
        const calculatorKey = key as keyof typeof this.attributeCalculators;

        attributes[attributeKey].value = await this.attributeCalculators[
          calculatorKey
        ](base[attributeKey], attributes[attributeKey], nature, level);
      }
    }

    return attributes;
  }

  async generateIVandNV(
    attributes: PokemonAttributes
  ): Promise<PokemonAttributes> {
    for (const attributeKey in StatKey) {
      if (Object.prototype.hasOwnProperty.call(StatKey, attributeKey)) {
        attributes[attributeKey as keyof PokemonAttributes].iv =
          getRandomNumber(0, 31);
        attributes[attributeKey as keyof PokemonAttributes].nv =
          getRandomNumber(1, 10);
      }
    }

    return attributes;
  }

  async calculateSpeed(
    baseAttribute: number,
    attribute: PokemonAttribute,
    nature: Natures,
    level: number
  ): Promise<number> {
    const { base, naturalValue, natureEffect } = this.calculateAttribute(
      baseAttribute,
      nature,
      attribute,
      level,
      StatKey.speed
    );

    return Math.floor((base + 5) * natureEffect + naturalValue);
  }

  async calculateSpecialDefense(
    baseAttribute: number,
    attribute: PokemonAttribute,
    nature: Natures,
    level: number
  ): Promise<number> {
    const { base, naturalValue, natureEffect } = this.calculateAttribute(
      baseAttribute,
      nature,
      attribute,
      level,
      StatKey.specialDefense
    );

    return Math.floor((base + 5) * natureEffect + naturalValue);
  }

  async calculateSpecialAttack(
    baseAttribute: number,
    attribute: PokemonAttribute,
    nature: Natures,
    level: number
  ): Promise<number> {
    const { base, naturalValue, natureEffect } = this.calculateAttribute(
      baseAttribute,
      nature,
      attribute,
      level,
      StatKey.specialAttack
    );

    return Math.floor((base + 5) * natureEffect + naturalValue);
  }

  async calculateDefense(
    baseAttribute: number,
    attribute: PokemonAttribute,
    nature: Natures,
    level: number
  ): Promise<number> {
    const { base, naturalValue, natureEffect } = this.calculateAttribute(
      baseAttribute,
      nature,
      attribute,
      level,
      StatKey.defense
    );

    return Math.floor((base + 5) * natureEffect + naturalValue);
  }

  async calculateAttack(
    baseAttribute: number,
    attribute: PokemonAttribute,
    nature: Natures,
    level: number
  ): Promise<number> {
    const { base, naturalValue, natureEffect } = this.calculateAttribute(
      baseAttribute,
      nature,
      attribute,
      level,
      StatKey.attack
    );

    return Math.floor((base + 5) * natureEffect + naturalValue);
  }

  async calculateHealth(
    baseAttribute: number,
    attribute: PokemonAttribute,
    nature: Natures,
    level: number
  ): Promise<number> {
    const { base, naturalValue, natureEffect } = this.calculateAttribute(
      baseAttribute,
      nature,
      attribute,
      level,
      StatKey.health
    );

    return Math.floor((base + level + 10) * natureEffect + naturalValue);
  }

  private calculateAttribute(
    baseAttribute: number,
    nature: Natures,
    attribute: PokemonAttribute,
    level: number,
    attributeKey: StatKey
  ): { base: number; naturalValue: number; natureEffect: number } {
    const natureEffect = this.getEffectNature(nature, attributeKey);
    const base = this.calculateBaseStat(
      baseAttribute,
      attribute.iv,
      attribute.ev,
      level
    );
    const naturalValue = this.calculateNaturalValue(attribute.nv, level);

    return { base, naturalValue, natureEffect };
  }

  private calculateBaseStat(
    value: number,
    iv: number,
    ev: number,
    level: number
  ): number {
    const base = ((2 * value + iv + ev / 4) * level) / 100;

    return Math.floor(base);
  }

  private calculateNaturalValue(nv: number, level: number): number {
    return (level * nv) / 100;
  }

  private getEffectNature(nature: Natures, stat: StatKey): number {
    const effect = NatureEffect[nature];
    return effect[stat];
  }
}
