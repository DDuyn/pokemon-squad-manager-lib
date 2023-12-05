import { CharacterAttributes } from "../types/CharacterAttributes";

export interface ArchetypeFactory {
  generate(): CharacterAttributes;
}
