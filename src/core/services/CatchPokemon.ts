import { TYPES } from "@config/Types";
import { PokemonMapper } from "@core/mappers/pokemon/PokemonMapper";
import { EnemyPokemon, OwnPokemon } from "@core/types/pokemon/PokemonData";
import { Logger } from "@shared/services/logger/interfaces/Logger";
import { inject, injectable } from "inversify";

@injectable()
export class CatchPokemon {
  constructor(
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.PokemonMapper) private readonly mapper: PokemonMapper
  ) {}

  //TODO: Bonus ball and status
  async execute(pokemon: EnemyPokemon): Promise<OwnPokemon | undefined> {
    const { currentHealth, status, attributes, detail } = pokemon;
    const { catchRate } = detail;
    const { health } = attributes.stats;

    const bonusBall = 1;
    const bonusStatus = 1;

    const probability = this.calculateCaptureProbability(
      currentHealth,
      health.value,
      catchRate,
      bonusBall,
      bonusStatus
    );

    const randomNumber = Math.floor(Math.random() * 256);
    const isCaptured = randomNumber < probability;

    this.logger.info({
      message: `Pokemon ${isCaptured ? "captured" : "escaped"}`,
      data: {
        ...pokemon.basic,
        catchRate,
        bonusBall,
        bonusStatus,
        probability,
        randomNumber,
      },
      method: "CatchPokemon.execute",
    });

    const ownPokemon = this.mapper.toOwnPokemon(pokemon);

    return isCaptured ? ownPokemon : undefined;
  }

  private calculateCaptureProbability(
    currentHealth: number,
    maxHealth: number,
    catchRate: number,
    bonusBall: number,
    bonusStatus: number
  ): number {
    return Math.floor(
      (((3 * maxHealth - 2 * currentHealth) * (catchRate * bonusBall)) /
        (3 * maxHealth)) *
        bonusStatus
    );
  }
}
