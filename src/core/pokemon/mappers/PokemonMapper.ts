import { injectable } from "inversify";
import { Pokemon, PokemonJson } from "../types/Pokemon";
import { GrowthRate } from "../types/PokemonInfo";

@injectable()
export class PokemonMapper {
  async toPokemon(pokemonJson: PokemonJson): Promise<Pokemon> {
    this.validateGrowthRate(pokemonJson.growthRate);

    return {
      id: crypto.randomUUID(),
      info: {
        name: pokemonJson.name,
        types: pokemonJson.types,
        genderRatio: pokemonJson.genderRatio,
        catchRate: pokemonJson.catchRate,
        growthRate: pokemonJson.growthRate as GrowthRate,
        eggCycles: pokemonJson.eggCycles,
      },
      attributes: {
        health: pokemonJson.baseStats.health,
        attack: pokemonJson.baseStats.attack,
        defense: pokemonJson.baseStats.defense,
        specialAttack: pokemonJson.baseStats.specialAttack,
        specialDefense: pokemonJson.baseStats.specialDefense,
        speed: pokemonJson.baseStats.speed,
        level: 1,
        currentExperience: 0,
        nextLevelExperience: 100,
      },
    };
  }

  private validateGrowthRate(value: string): value is GrowthRate {
    const validGrowthRates: GrowthRate[] = [
      "Fast",
      "Medium Fast",
      "Medium Slow",
      "Slow",
    ];
    if (!validGrowthRates.includes(value as GrowthRate)) {
      throw new Error(`Invalid growth rate: ${value}`);
    }
    return true;
  }
}
