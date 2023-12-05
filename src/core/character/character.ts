import { Archetype } from "./types/Archetype";
import { CharacterAttributes } from "./types/CharacterAttributes";
import { CharacterData } from "./types/CharacterData";

/**
 * Represents a character in the game.
 */
export class Character {
  private id: string;
  private name: string;
  private archetype: Archetype;
  private attributes: CharacterAttributes;

  /**
   * Creates a new instance of the Character class.
   * @param archetype The archetype of the character.
   */
  constructor(characterData: CharacterData) {
    this.id = characterData.id;
    this.name = characterData.name;
    this.archetype = characterData.archetype;
    this.attributes = characterData.attributes;
  }

  get info(): CharacterData {
    return {
      id: this.id,
      name: this.name,
      archetype: this.archetype,
      attributes: this.attributes,
    };
  }

  get stats(): CharacterAttributes {
    return this.attributes;
  }
}
