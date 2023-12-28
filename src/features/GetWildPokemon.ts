import { GeneratePokemon } from "@core/services/GeneratePokemon";
import { GetAvailablePokemons } from "@core/services/GetAvailablePokemon";
import { PokemonEncounter } from "@core/types/location/Location";
import { EnemyPokemon } from "@core/types/pokemon/PokemonData";
import { getRandomToList } from "@shared/services/GetRandomToList";
import container from "../config/DependencyInjection";
import { TYPES } from "../config/Types";

export class GetWildPokemon {
  private readonly getAvailablePokemons: GetAvailablePokemons;
  private readonly generatePokemon: GeneratePokemon;

  constructor() {
    this.getAvailablePokemons = container.get<GetAvailablePokemons>(
      TYPES.GetAvailablePokemons
    );
    this.generatePokemon = container.get<GeneratePokemon>(
      TYPES.GeneratePokemon
    );
  }

  async execute(
    locationName: string,
    routeName: string
  ): Promise<EnemyPokemon> {
    const { availablePokemons, levelRange } =
      await this.getAvailablePokemons.execute(locationName, routeName);

    const pokemonToGenerate = this.getRandomWildPokemon(availablePokemons);

    const pokemon = await this.generatePokemon.execute(
      pokemonToGenerate.name,
      levelRange
    );

    return {
      ...pokemon,
      isWild: true,
      currentHealth: pokemon.attributes.stats.health.value,
      status: "none",
      isFainted: false,
    };
  }

  private getRandomWildPokemon(
    availablePokemons: PokemonEncounter[]
  ): PokemonEncounter {
    const totalencounterRate = availablePokemons.reduce(
      (sum, pokemon) => sum + pokemon.encounterRate,
      0
    );

    let random = Math.floor(Math.random() * totalencounterRate);

    for (const pokemon of availablePokemons) {
      if (random <= 0) return pokemon;
      random -= pokemon.encounterRate;
    }

    //TODO: Crear fichero de ratio de encuentro de los pokemon
    return getRandomToList<PokemonEncounter>(availablePokemons);
  }
}
