import "reflect-metadata";

import container from "@config/DependencyInjection";
import { CapturePokemon } from "./features/CapturePokemon";
import { POKEMON_DI_TYPES } from "./modules/pokemon/config/DependencyInjection";
import { GenerateWildPokemon } from "./modules/pokemon/services/GenerateWildPokemon";

const a = container.get<GenerateWildPokemon>(
  POKEMON_DI_TYPES.GenerateWildPokemon
);
const b = container.get<CapturePokemon>(POKEMON_DI_TYPES.CapturePokemon);

const pok = await a.execute("pallet-town", "route-1");
console.log(pok);
const result = await b.execute(pok);
console.log("Cazado??", result);

//console.log(pokemonEnemy);
//console.log(result);
