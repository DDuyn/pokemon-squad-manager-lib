import { randomizeEnumerator } from "@shared/services";
import { inject, injectable } from "inversify";

import { Logger } from "@core/logger/interfaces/Logger";
import { TYPES } from "../../../config/Types";
import { Character } from "../Character";
import { generateRandomName } from "../services/GenerateRamdomName";
import { Archetype, ArchetypeFactoryRegistry } from "../types/Archetype";
import { CharacterAttributes } from "../types/CharacterAttributes";
import { CharacterData } from "../types/CharacterData";

@injectable()
export class CharacterFactory {
  constructor(
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.ArchetypeFactoryRegistry)
    private readonly archetypeFactoryRegistry: ArchetypeFactoryRegistry
  ) {}

  generateCharacter(): Character {
    try {
      const characterData = this.generateCharacterData();
      const character = new Character(characterData);

      this.logger.info({
        message: "Character generated",
        data: { character: character.info },
        method: "CharacterFactory.generateCharacter",
      });

      return character;
    } catch (error) {
      this.logger.error({
        message: "Error generating character",
        data: { error },
        method: "CharacterFactory.generateCharacter",
      });

      throw error;
    }
  }

  private generateCharacterData(): CharacterData {
    const archetype = this.generateArchetype();
    const attributes = this.generateAttributes(archetype);

    return {
      id: crypto.randomUUID(),
      name: generateRandomName(),
      archetype: archetype,
      attributes: attributes,
    };
  }

  private generateArchetype(): Archetype {
    return randomizeEnumerator(Archetype);
  }

  private generateAttributes(archetype: Archetype): CharacterAttributes {
    return this.archetypeFactoryRegistry[archetype].generate();
  }
}
