import { TYPES } from "@config/Types";

import { inject, injectable } from "inversify";
import path from "path";
import { Cache } from "../../shared/services/cache/Cache";
import { Logger } from "../../shared/services/logger/interfaces/Logger";
import { JsonReader } from "../../shared/services/reader/JsonReader";
import { PokemonJson } from "../models/PokemonTypes";
import { PokemonRepository } from "./PokemonRepository";

@injectable()
export class PokemonJsonRepository implements PokemonRepository {
  private readonly pokemonDataDir = path.resolve(
    import.meta.dir,
    "../data" //TODO: Crear variable de entorno para la ruta de los datos
  );

  constructor(
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.Reader) private readonly jsonReader: JsonReader,
    @inject(TYPES.Cache) private readonly cache: Cache<PokemonJson>
  ) {}

  async getPokemon(name: string): Promise<PokemonJson> {
    const cachedPokemon = await this.cache.get(name);

    if (cachedPokemon) {
      await this.logger.info({
        message: `Pokemon ${name} readed from cache`,
        data: { cachedPokemon },
        method: "PokemonJsonRepository.getPokemon",
      });
      return cachedPokemon;
    }

    const pokemonFiles = await this.getDirectoryFiles();

    const pokemonFile = pokemonFiles.find(
      (pokemonFile) =>
        pokemonFile.replace(".json", "").toLowerCase() === name.toLowerCase()
    );

    if (!pokemonFile) {
      this.logger.error({
        message: `Pokemon ${name} not found`,
        data: { name },
        method: "PokemonJsonRepository.getPokemon",
      });
      throw new Error(`Pokemon ${name} not found`);
    }

    const pokemonJSON = await this.jsonReader.readFileAsync<PokemonJson>(
      path.join(this.pokemonDataDir, pokemonFile)
    );

    this.cache.set(name, pokemonJSON);

    await this.logger.info({
      message: `Pokemon ${name} readed`,
      data: { pokemonJSON },
      method: "PokemonJsonRepository.getPokemon",
    });

    return pokemonJSON;
  }

  private async getDirectoryFiles(): Promise<string[]> {
    return this.jsonReader.readDirAsync(this.pokemonDataDir);
  }
}
