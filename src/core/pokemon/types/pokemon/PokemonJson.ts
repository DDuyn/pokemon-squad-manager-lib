import { Stat } from "./PokemonStats";
import { PokemonTypes } from "./PokemonTypes";

export type PokemonJson = {
  name: string;
  types: PokemonTypes;
  baseStats: {
    health: Stat;
    attack: Stat;
    defense: Stat;
    specialAttack: Stat;
    specialDefense: Stat;
    speed: Stat;
  };
  abilities: string[];
  genderRatio: number;
  catchRate: number;
  eggCycles: number;
};
