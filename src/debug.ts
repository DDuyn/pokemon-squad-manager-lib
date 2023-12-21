import "reflect-metadata";

import { CapturePokemon } from "./features/CapturePokemon";
import { GetWildPokemon } from "./features/GetWildPokemon";

const catchService = new CapturePokemon();
const e = new GetWildPokemon();

const pokemonEnemy = await e.execute("pallettown", "Route 1");

const ownPokemon = await catchService.execute(pokemonEnemy);

const result = ownPokemon
  ? `${ownPokemon.basic.name} captured`
  : `${pokemonEnemy.basic.name} escaped`;

console.log(pokemonEnemy);
console.log(result);
