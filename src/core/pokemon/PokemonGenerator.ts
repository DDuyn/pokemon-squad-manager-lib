import { Logger } from "@core/logger/interfaces/Logger";
import { getRandomToList } from "@shared/services";
import fs from "fs";
import { inject, injectable } from "inversify";
import path from "path";
import { TYPES } from "../../config/Types";
import { PokemonMapper } from "./mappers/PokemonMapper";
import { Pokemon, PokemonJson } from "./types/Pokemon";

@injectable()
export class PokemonGenerator {
  private readonly pokemonDataDir = path.resolve(
    import.meta.dir,
    "../../data/pokemons"
  );

  constructor(
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.PokemonMapper) private readonly mapper: PokemonMapper
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
    try {
      const pokemonFiles = fs.readdirSync(this.pokemonDataDir);
      const randomPokemonFile = getRandomToList(pokemonFiles);
      const pokemonData = fs.readFileSync(
        path.join(this.pokemonDataDir, randomPokemonFile),
        "utf-8"
      );

      const pokemonJSON: PokemonJson = JSON.parse(pokemonData);
      const pokemon = await this.mapper.toPokemon(pokemonJSON);

      await this.logger.info({
        message: "Pokemon loaded from file",
        data: { pokemonJSON },
        method: "PokemonGenerator.getRandomPokemon",
      });

      return pokemon;
    } catch (error) {
      this.logger.error({
        message: "Failed to load random Pokemon",
        data: { error, pokemonDataDir: this.pokemonDataDir },
        method: "PokemonGenerator.getRandomPokemon",
      });

      throw error;
    }
  }
}
