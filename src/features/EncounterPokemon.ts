import { GeneratePokemon } from "@core/services/GeneratePokemon";
import { GeneratePokemonStats } from "@core/services/GeneratePokemonStats";
import { GetAvailablePokemons } from "@core/services/GetAvailablePokemon";
import { PokemonEncounter } from "@core/types/location/Location";
import { Pokemon } from "@core/types/pokemon/PokemonData";
import { getRandomNumber } from "@shared/services/GetRandomNumber";
import { getRandomToList } from "@shared/services/GetRandomToList";
import container from "../config/DependencyInjection";
import { TYPES } from "../config/Types";

export class EncounterPokemon {
  private readonly getAvailablePokemons: GetAvailablePokemons;
  private readonly generatePokemonStats: GeneratePokemonStats;
  private readonly generatePokemon: GeneratePokemon;
  constructor() {
    this.getAvailablePokemons = container.get<GetAvailablePokemons>(
      TYPES.GetAvailablePokemons
    );
    this.generatePokemon = container.get<GeneratePokemon>(
      TYPES.GeneratePokemon
    );
    this.generatePokemonStats = container.get<GeneratePokemonStats>(
      TYPES.GeneratePokemonStats
    );
  }

  async getWildPokemon(
    locationName: string,
    routeName: string
  ): Promise<Pokemon> {
    const { availablePokemons, levelRange } =
      await this.getAvailablePokemons.execute(locationName, routeName);

    const pokemonToGenerate =
      getRandomToList<PokemonEncounter>(availablePokemons);
    const pokemon = await this.generatePokemon.execute(pokemonToGenerate.name);
    const level = getRandomNumber(levelRange.min, levelRange.max);

    pokemon.stats = await this.generatePokemonStats.execute({
      baseStats: pokemon.base,
      nature: pokemon.basic.nature,
      level,
      growthRate: pokemon.detail.growthRate,
    });

    return pokemon;
  }
}
