import { Archetype } from "@core/character/types/Archetype";
import { expect, test } from "bun:test";
import { generateCharacter } from "../../../../src/services/GenerateCharacter";

test("Character should have a valid archetype", () => {
  const character = generateCharacter();
  expect(Object.values(Archetype)).toContain(character.info.archetype);
});
