import { Attribute, PokemonAttributes } from "./PokemonAttributes";
import { PokemonInfo, PokemonTypes } from "./PokemonInfo";

export type Pokemon = {
  id: string;
  info: PokemonInfo;
  attributes: PokemonAttributes;
};

export type PokemonJson = {
  name: string;
  types: PokemonTypes;
  baseStats: {
    health: Attribute;
    attack: Attribute;
    defense: Attribute;
    specialAttack: Attribute;
    specialDefense: Attribute;
    speed: Attribute;
  };
  abilities: string[];
  genderRatio: number;
  catchRate: number;
  growthRate: string;
  eggCycles: number;
};
