import { Archetype } from "@shared/enums";
import { randomizeEnumerator } from "@shared/services";

export class Character {
  archetype: Archetype;

  /**
   *
   */
  private constructor(archetype: Archetype) {
    this.archetype = archetype;
  }

  static generateCharacter(): Character {
    const archetype = randomizeEnumerator(Archetype);
    console.log(archetype);
    return new Character(archetype);
  }
}
