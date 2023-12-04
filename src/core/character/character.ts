import { Archetype } from "../shared/enums";

/**
 * Represents a character in the game.
 */
export class Character {
  archetype: Archetype;

  /**
   * Creates a new instance of the Character class.
   * @param archetype The archetype of the character.
   */
  constructor(archetype: Archetype) {
    this.archetype = archetype;
  }
}
