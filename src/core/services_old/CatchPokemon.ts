/*
@injectable()
export class CatchPokemon {
  constructor(@inject(TYPES.Logger) private readonly logger: Logger) {}

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

    return isCaptured ? ({} as OwnPokemon) : undefined;
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
*/
