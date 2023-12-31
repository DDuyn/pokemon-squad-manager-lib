import container from "@config/DependencyInjection";
import { TYPES } from "@config/Types";
import { CatchPokemon } from "@core/services_old/CatchPokemon";
import { EnemyPokemon, OwnPokemon } from "@core/types/pokemon/PokemonData";

export class CapturePokemon {
  private readonly catchPokemon: CatchPokemon;

  constructor() {
    this.catchPokemon = container.get<CatchPokemon>(TYPES.CatchPokemon);
  }

  async execute(pokemon: EnemyPokemon): Promise<OwnPokemon | undefined> {
    return this.catchPokemon.execute(pokemon);
  }
}
