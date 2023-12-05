import { Character, CharacterFactory } from "@core/character";
import "reflect-metadata";
import container from "../config/DependencyInjection";
import { TYPES } from "../config/Types";

export const generateCharacter = (): Character => {
  const characterFactory = container.get<CharacterFactory>(
    TYPES.CharacterFactory
  );
  return characterFactory.generateCharacter();
};
