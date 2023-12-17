import { TYPES } from "@config/Types";
import { PokemonJson } from "@core/pokemon/types/pokemon/PokemonJson";
import { Cache } from "@core/shared/services/cache/Cache";
import { Logger } from "@core/shared/services/logger/interfaces/Logger";
import { JsonReader } from "@core/shared/services/reader/JsonReader";
import { inject, injectable } from "inversify";
import path from "path";

import { PokemonMapper } from "../mappers/PokemonMapper";
import { PokemonBaseData } from "../types/pokemon/PokemonData";
import { PokemonRepository } from "./PokemonRepository";

@injectable()
export class PokemonJsonRepository implements PokemonRepository {
  private readonly pokemonDataDir = path.resolve(
    import.meta.dir,
    "../../../data/pokemons" //TODO: Crear variable de entorno para la ruta de los datos
  );

  constructor(
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.Reader) private readonly jsonReader: JsonReader,
    @inject(TYPES.Cache) private readonly cache: Cache<PokemonJson>,
    @inject(TYPES.PokemonMapper)
    private readonly mapper: PokemonMapper<PokemonJson>
  ) {}

  async getPokemons(names: string[]): Promise<PokemonBaseData[]> {
    const pokemonFiles = await this.jsonReader.readDirAsync(
      this.pokemonDataDir
    );

    const validPokemonFiles = pokemonFiles
      .map((pokemonFile) => pokemonFile.toLowerCase())
      .filter((pokemonFile) =>
        names.includes(pokemonFile.replace(".json", ""))
      );

    const pokemons: PokemonBaseData[] = [];

    for (const pokemonFile of validPokemonFiles) {
      try {
        let pokemonJSON = await this.cache.get(pokemonFile);

        if (!pokemonJSON) {
          pokemonJSON = await this.jsonReader.readFileAsync<PokemonJson>(
            path.join(this.pokemonDataDir, pokemonFile)
          );

          await this.cache.set(pokemonFile, pokemonJSON);
        }

        await this.logger.info({
          message: `Pokemon ${pokemonFile} readed`,
          data: { pokemonJSON },
          method: "PokemonJsonRepository.getPokemons",
        });

        const pokemonBaseData = this.mapper.toPokemonBase(pokemonJSON);

        pokemons.push(pokemonBaseData);
      } catch (error) {
        this.logger.error({
          message: `Failed to read pokemon ${pokemonFile}`,
          data: { error },
          method: "PokemonJsonRepository.getPokemons",
        });
      }
    }

    return pokemons;
  }

  async getPokemon(name: string): Promise<PokemonBaseData> {
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

    await this.logger.info({
      message: `Pokemon ${name} readed`,
      data: { pokemonJSON },
      method: "PokemonJsonRepository.getPokemon",
    });

    const pokemonBaseData = this.mapper.toPokemonBase(pokemonJSON);

    return pokemonBaseData;
  }

  private async getDirectoryFiles(): Promise<string[]> {
    return this.jsonReader.readDirAsync(this.pokemonDataDir);
  }
}
