import { Archetype } from "@shared/enums";
import { expect, test } from "bun:test";
import { generateCharacter } from "../../../../src/services/GenerateCharacter";

test("Character should have a valid archetype", () => {
  const character = generateCharacter();
  expect(character.archetype).toMatchObject(Object.values(Archetype));
});
