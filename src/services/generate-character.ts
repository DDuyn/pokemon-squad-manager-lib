import { Character, CharacterFactory } from "@core/character";
import "reflect-metadata";
import container from "../config/dependency-injection";
import { TYPES } from "../config/types";

export const generateCharacter = (): Character => {
  const characterFactory = container.get<CharacterFactory>(
    TYPES.CharacterFactory
  );
  return characterFactory.generateCharacter();
};
