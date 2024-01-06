import "reflect-metadata";

import container from "@config/DependencyInjection";

import { POKEMON_DI_TYPES } from "./modules/pokemon/config/DependencyInjection";
import { CapturePokemon } from "./modules/pokemon/features/CapturePokemon";
import { GainExperiencePokemon } from "./modules/pokemon/features/GainExperiencePokemon";
import { GenerateWildPokemon } from "./modules/pokemon/features/GenerateWildPokemon";

const a = container.get<GenerateWildPokemon>(
  POKEMON_DI_TYPES.GenerateWildPokemon
);
const b = container.get<CapturePokemon>(POKEMON_DI_TYPES.CapturePokemon);
const c = container.get<GainExperiencePokemon>(
  POKEMON_DI_TYPES.GainExperiencePokemon
);

const pok = await a.execute("pallet-town", "route-1");
const myPok = await a.execute("pallet-town", "route-1");
pok.stats.current.level = 100;
myPok.combatStats.isParticipating = true;
myPok.isWild = false;
console.log("Enemy", pok);
console.log("My", myPok);

const r = await c.execute(myPok, pok, false);
console.log("level", r);

const r1 = await c.execute(r, pok, false);
console.log("level", r1);

//console.log(pokemonEnemy);
//console.log(result);
