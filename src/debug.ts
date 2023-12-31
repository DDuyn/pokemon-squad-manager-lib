import "reflect-metadata";

import container from "@config/DependencyInjection";
import { POKEMON_DI_TYPES } from "./modules/pokemon/config/DependencyInjection";
import { GenerateWildPokemon } from "./modules/pokemon/services/GenerateWildPokemon";

const a = container.get<GenerateWildPokemon>(
  POKEMON_DI_TYPES.GenerateWildPokemon
);
const pok = await a.execute("bulbasaur");
console.log(pok);

//console.log(pokemonEnemy);
//console.log(result);
