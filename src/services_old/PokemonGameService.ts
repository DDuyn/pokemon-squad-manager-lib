import {
  EnemyPokemon,
  OwnPokemon,
  Pokemon,
} from "@core/types/pokemon/PokemonData";
import { CapturePokemon } from "../features/CapturePokemon";
import { GetWildPokemon } from "../features/GetWildPokemon";

//TODO: Revisar para refactorizar
export class PokemonGameService {
  private readonly getWildPokemon: GetWildPokemon;
  private readonly capturePokemon: CapturePokemon;

  constructor() {
    this.getWildPokemon = new GetWildPokemon();
    this.capturePokemon = new CapturePokemon();
  }

  async encounterPokemon(): Promise<Pokemon> {
    return this.getWildPokemon.execute("pallettown", "Route 1"); //TODO: La información llegará de otro modo
  }

  async attempCapture(pokemon: EnemyPokemon): Promise<OwnPokemon | undefined> {
    return this.capturePokemon.execute(pokemon);
  }
}
