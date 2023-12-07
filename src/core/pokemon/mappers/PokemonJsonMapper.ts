import { injectable } from "inversify";
import { Pokemon, PokemonJson } from "../types/Pokemon";
import { GrowthRate } from "../types/PokemonInfo";
import { PokemonMapper } from "./PokemonMapper";

@injectable()
export class PokemonJsonMapper implements PokemonMapper<PokemonJson> {
  async toPokemon(pokemon: PokemonJson): Promise<Pokemon> {
    this.validateGrowthRate(pokemon.growthRate);

    return {
      id: crypto.randomUUID(),
      info: {
        name: pokemon.name,
        types: pokemon.types,
        genderRatio: pokemon.genderRatio,
        catchRate: pokemon.catchRate,
        growthRate: pokemon.growthRate as GrowthRate,
        eggCycles: pokemon.eggCycles,
      },
      attributes: {
        health: pokemon.baseStats.health,
        attack: pokemon.baseStats.attack,
        defense: pokemon.baseStats.defense,
        specialAttack: pokemon.baseStats.specialAttack,
        specialDefense: pokemon.baseStats.specialDefense,
        speed: pokemon.baseStats.speed,
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
