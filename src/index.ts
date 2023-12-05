import "reflect-metadata";
import { generatePokemon } from "./services/GeneratePokemon";

const b = await generatePokemon();

console.log(b);
