import { PokemonTypes } from "./PokemonTypes";

export type PokemonBasicInfo = {
  id: string;
  name: string;
  types: PokemonTypes;
  nature: string;
};
