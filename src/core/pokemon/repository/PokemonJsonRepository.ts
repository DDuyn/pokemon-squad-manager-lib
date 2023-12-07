import { TYPES } from "@config/Types";
import { Logger } from "@core/logger/interfaces/Logger";
import { Pokemon, PokemonJson } from "@core/pokemon/types/Pokemon";
import { Cache } from "@core/shared/services/cache/Cache";
import { JsonReader } from "@core/shared/services/reader/JsonReader";
import { inject, injectable } from "inversify";
import path from "path";
import { PokemonMapper } from "../mappers/PokemonMapper";
import { PokemonRepository } from "./PokemonRepository";

@injectable()
export class PokemonJsonRepository implements PokemonRepository {
  private readonly pokemonDataDir = path.resolve(
    import.meta.dir,
    "../../../data/pokemons"
  );

  constructor(
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.PokemonMapper)
    private readonly mapper: PokemonMapper<PokemonJson>,
    @inject(TYPES.Reader) private readonly jsonReader: JsonReader,
    @inject(TYPES.Cache) private readonly cache: Cache<PokemonJson>
  ) {}

  //TODO: Refactor. Cambiar tipado del parámetro de entrada por tipo Zone que contendra
  //TODO: un listado con los nombres de pokemons disponibles en esa zona
  async getPokemons(zone: string[]): Promise<Pokemon[]> {
    const pokemonFiles = await this.jsonReader.readDirAsync(
      this.pokemonDataDir
    );

    const validPokemonFiles = pokemonFiles
      .map((pokemonFile) => pokemonFile.toLowerCase())
      .filter((pokemonFile) => zone.includes(pokemonFile.replace(".json", "")));

    const pokemons: Pokemon[] = [];

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

        const pokemon = await this.mapper.toPokemon(pokemonJSON);
        pokemons.push(pokemon);
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
}
