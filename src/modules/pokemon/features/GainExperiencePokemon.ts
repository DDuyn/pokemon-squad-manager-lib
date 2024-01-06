import { inject, injectable } from "inversify";
import { POKEMON_DI_TYPES } from "../config/DependencyInjection";
import { Pokemon } from "../models/Pokemon";
import { CalculateExperience } from "../services/CalculateExperience";
import { LevelUpPokemon } from "../services/LevelUpPokemon";

@injectable()
export class GainExperiencePokemon {
  constructor(
    @inject(POKEMON_DI_TYPES.CalculateExperience)
    private readonly calculateExperience: CalculateExperience,
    @inject(POKEMON_DI_TYPES.LevelUpPokemon)
    private readonly levelUpPokemon: LevelUpPokemon
  ) {}

  async execute(
    pokemon: Pokemon,
    enemy: Pokemon,
    isShareExperience: boolean
  ): Promise<Pokemon> {
    const experienceGained = await this.getTotalExperienceGained(
      enemy,
      pokemon.combatStats.isParticipating,
      isShareExperience
    );

    await this.gainExperience(experienceGained, pokemon);
    const totalLevelGained = await this.getTotalLevelGained(pokemon);

    if (totalLevelGained > 0) {
      await this.levelUpPokemon.execute(pokemon, totalLevelGained);
    }

    return pokemon;
  }

  private async getTotalExperienceGained(
    enemy: Pokemon,
    isParticipating: boolean,
    isShareExperience: boolean
  ) {
    const { isWild, detailInfo, stats } = enemy;
    const baseExperience = detailInfo.baseExperience;
    const level = stats.current.level;

    const a = isWild ? 1 : 1.5;
    const s = isParticipating || !isShareExperience ? 1 : 2;

    return Math.floor((baseExperience * level) / (7 * s * a));
  }

  private async gainExperience(experienceGained: number, pokemon: Pokemon) {
    pokemon.stats.current.currentExperience += experienceGained;
  }

  private async getTotalLevelGained(pokemon: Pokemon): Promise<number> {
    const currentExperience = pokemon.stats.current.currentExperience;
    let nextLevelExperience = pokemon.stats.current.nextLevelExperience;
    let totalLevelGained = 0;

    while (currentExperience >= nextLevelExperience) {
      totalLevelGained++;
      const level = pokemon.stats.current.level + totalLevelGained;
      nextLevelExperience = await this.calculateExperience.nextLevelExperience(
        level,
        pokemon.detailInfo.growthRate
      );
    }

    pokemon.stats.current.nextLevelExperience = nextLevelExperience;

    return totalLevelGained;
  }
}
