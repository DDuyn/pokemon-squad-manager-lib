import { RangeNumber } from "@shared/types";

export type PokemonAttributes = {
  health: Attribute;
  attack: Attribute;
  defense: Attribute;
  specialAttack: Attribute;
  specialDefense: Attribute;
  speed: Attribute;
  level: number;
  currentExperience: number;
  nextLevelExperience: number;
};

export type Attribute = {
  stat: number;
  iv: number;
  ev: number;
};

export type PokemonTypeAttributes = {
  stat: RangeNumber;
  iv: RangeNumber;
  ev: RangeNumber;
};

export type PokemonTypeAttributesRanges = {
  health: PokemonTypeAttributes;
  attack: PokemonTypeAttributes;
  defense: PokemonTypeAttributes;
  specialAttack: PokemonTypeAttributes;
  specialDefense: PokemonTypeAttributes;
  speed: PokemonTypeAttributes;
};
