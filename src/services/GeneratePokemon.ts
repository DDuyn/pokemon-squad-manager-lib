import { PokemonGenerator } from "@core/pokemon/PokemonGenerator";
import container from "../config/DependencyInjection";
import { TYPES } from "../config/Types";

export const generatePokemon = async () => {
  const pokemonGenerator = container.get<PokemonGenerator>(
    TYPES.PokemonGenerator
  );
  return pokemonGenerator.generate();
};
