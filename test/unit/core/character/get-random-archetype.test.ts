import { Archetype } from "@shared/enums";
import { randomizeEnumerator } from "@shared/services";
import { expect, test } from "bun:test";

test("Should have a valid archetype", async () => {
  // Arrange
  const archetype = randomizeEnumerator(Archetype);

  // Assert
  expect(archetype).toMatchObject(Object.values(Archetype));
});
