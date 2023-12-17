import "reflect-metadata";
import { EncounterPokemon } from "./features/EncounterPokemon";

const e = new EncounterPokemon();
const c = await e.getWildPokemon("pallettown", "Route 1");

console.log(c);
