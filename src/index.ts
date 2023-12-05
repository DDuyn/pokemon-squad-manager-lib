import "reflect-metadata";
import { generateCharacter } from "./services/GenerateCharacter";

const a = generateCharacter();

console.log(a.info);
