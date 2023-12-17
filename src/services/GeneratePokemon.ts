import { GetAvailablePokemons } from "@core/location/services/GetAvailablePokemon";
import { PokemonGenerator } from "@core/pokemon/services/generator/PokemonGenerator";
import { getRandomToList } from "@core/shared/services";
import container from "../config/DependencyInjection";
import { TYPES } from "../config/Types";

export const generatePokemon = async () => {
  const location = container.get<GetAvailablePokemons>(
    TYPES.GetAvailablePokemons
  );
  const pokemonGenerator = container.get<PokemonGenerator>(
    TYPES.PokemonGenerator
  );

  const availablePokemons = await location.execute("pallettown", "Route 1");

  const pokemonToGenerate = getRandomToList(availablePokemons.pokemon);
  return pokemonGenerator.generate(pokemonToGenerate.name);
};
