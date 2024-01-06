import { SHARED_DI_TYPES } from "@shared/config/DependencyInjection";
import { Logger } from "@shared/services/logger/interfaces/Logger";
import { inject, injectable } from "inversify";
import { POKEMON_DI_TYPES } from "../config/DependencyInjection";
import { Pokemon } from "../models/Pokemon";
import { UpgradePokemonStats } from "./UpgradePokemonStats";

@injectable()
export class LevelUpPokemon {
  constructor(
    @inject(POKEMON_DI_TYPES.UpgradePokemonStats)
    private readonly upgradePokemonStats: UpgradePokemonStats,
    @inject(SHARED_DI_TYPES.Logger) private readonly logger: Logger
  ) {}

  async execute(pokemon: Pokemon, nextLevel: number): Promise<Pokemon> {
    const level = pokemon.stats.current.level + nextLevel;
    const { stats } = pokemon;
    const oldStats = { ...stats.current };

    pokemon.stats.current = await this.upgradePokemonStats.execute({
      baseStats: stats.base,
      pokemon,
      level,
    });

    this.synchronizeCombatStats(pokemon);

    await this.logger.info({
      message: `Pokemon ${pokemon.name} level up ${oldStats.level} to ${pokemon.stats.current.level}`,
      data: { oldStats, newStats: pokemon.stats.current },
      method: "LevelUpPokemon.execute",
    });

    return pokemon;
  }

  private synchronizeCombatStats(pokemon: Pokemon): void {
    const combatStats = {
      ...pokemon.combatStats,
      attributes: pokemon.stats.current.attributes,
    };

    pokemon.combatStats = combatStats;
  }
}
