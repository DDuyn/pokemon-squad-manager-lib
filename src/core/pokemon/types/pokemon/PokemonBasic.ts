import { Natures } from "./PokemonNatures";
import { PokemonTypes } from "./PokemonTypes";

export type PokemonBasicData = {
  id: string;
  name: string;
  types: PokemonTypes;
  nature: Natures;
};

export type PokemonBasicBaseData = {
  name: string;
  types: PokemonTypes;
};
