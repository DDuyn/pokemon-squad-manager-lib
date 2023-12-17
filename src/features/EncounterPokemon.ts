import { GeneratePokemon } from "@core/services/GeneratePokemon";
import { GetAvailablePokemons } from "@core/services/GetAvailablePokemon";
import { getRandomToList } from "@shared/services/GetRandomToList";
import container from "../config/DependencyInjection";
import { TYPES } from "../config/Types";

export const encounterPokemon = async () => {
  const location = container.get<GetAvailablePokemons>(
    TYPES.GetAvailablePokemons
  );
  const pokemonGenerator = container.get<GeneratePokemon>(
    TYPES.GeneratePokemon
  );

  const availablePokemons = await location.execute("pallettown", "Route 1");

  const pokemonToGenerate = getRandomToList(availablePokemons.pokemon);
  return pokemonGenerator.execute(pokemonToGenerate.name);
};
