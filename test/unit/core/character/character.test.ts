import { expect, test } from "bun:test";
import { generateCharacter } from "../../../../src/services/generate-character";

test("Character should have a valid archetype", () => {
  const character = generateCharacter();
  expect(character.archetype).not.toBeUndefined();
});
