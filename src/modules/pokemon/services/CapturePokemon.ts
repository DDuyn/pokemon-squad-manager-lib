import { SHARED_DI_TYPES } from "@shared/config/DependencyInjection";
import { Logger } from "@shared/services/logger/interfaces/Logger";
import { inject, injectable } from "inversify";
import { Pokemon } from "../models/Pokemon";

@injectable()
export class CapturePokemon {
  constructor(
    @inject(SHARED_DI_TYPES.Logger) private readonly logger: Logger
  ) {}

  //TODO: Bonus ball and status
  async execute(wildPokemon: Pokemon): Promise<Pokemon> {
    const { combatStats, detailInfo } = wildPokemon;
    const { catchRate } = detailInfo;
    const { currentHealth, attributes } = combatStats;
    const { health } = attributes;

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

    if (isCaptured) wildPokemon.isWild = false;

    await this.logger.info({
      message: `Pokemon ${isCaptured ? "captured" : "escaped"}`,
      data: {
        ...wildPokemon,
        catchRate,
        bonusBall,
        bonusStatus,
        probability,
        randomNumber,
      },
      method: "CapturedPokemon.execute",
    });

    return wildPokemon;
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
