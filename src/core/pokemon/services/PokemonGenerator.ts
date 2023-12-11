import { TYPES } from "@config/Types";
import { Logger } from "@core/logger/interfaces/Logger";
import { getRandomToList } from "@core/shared/services";
import { inject, injectable } from "inversify";
import { Pokemon } from "../Pokemon";
import { PokemonRepository } from "../repository/PokemonRepository";

@injectable()
export class PokemonGenerator {
  constructor(
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.PokemonRepository)
    private readonly repository: PokemonRepository
  ) {}

  async generate(): Promise<Pokemon> {
    const pokemon = await this.getRandomPokemon();

    await this.logger.info({
      message: "Pokemon generated",
      data: { pokemon },
      method: "PokemonGenerator.generate",
    });

    return pokemon;
  }

  private async getRandomPokemon(): Promise<Pokemon> {
    const pokemonsAvailable = await this.repository.getPokemons([
      "bulbasaur",
      "charmander",
    ]);

    const pokemon = getRandomToList(pokemonsAvailable);
    return pokemon;
  }
}
