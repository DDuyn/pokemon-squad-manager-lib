import { inject, injectable } from "inversify";
import { TYPES } from "../../config/types";
import { Logger } from "../logger/interfaces/logger";
import { Archetype } from "../shared/enums/archetype";
import { randomizeEnumerator } from "../shared/services";
import { Character } from "./character";

@injectable()
export class CharacterFactory {
  private logger: Logger;

  constructor(@inject(TYPES.Logger) logger: Logger) {
    this.logger = logger;
  }

  generateCharacter(): Character {
    const archetype = randomizeEnumerator(Archetype);
    this.logger.log(`Generated character with archetype: ${archetype}`);
    return new Character(archetype);
  }
}
