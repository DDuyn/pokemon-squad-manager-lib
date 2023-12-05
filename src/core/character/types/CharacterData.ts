import { Archetype } from "./Archetype";
import { CharacterAttributes } from "./CharacterAttributes";

export type CharacterData = {
  id: string;
  name: string;
  archetype: Archetype;
  attributes: CharacterAttributes;
};
