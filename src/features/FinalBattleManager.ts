import container from "@config/DependencyInjection";
import { GainExperiencePokemon } from "@core/services_old/GainExperiencePokemon";
import { EnemyPokemon, OwnPokemon } from "@core/types/pokemon/PokemonData";

export class FinalBattleManager {
  private readonly gainExperience: GainExperiencePokemon;

  constructor() {
    this.gainExperience = container.get<GainExperiencePokemon>(
      GainExperiencePokemon
    );
  }

  async execute(
    team: OwnPokemon[],
    enemyPokemon: EnemyPokemon,
    isSharedExperience: boolean
  ): Promise<void> {
    this.validateTeam(team);

    const aliveTeam = team.filter(this.isAlive);
    for (const pokemon of aliveTeam) {
      if (pokemon.isParticipating || isSharedExperience) {
        const experience = await this.gainExperience.execute(
          enemyPokemon,
          pokemon.isParticipating,
          isSharedExperience
        );

        pokemon.attributes.currentExperience += experience;
        await this.checkLevelUp(pokemon);
      }
    }
  }

  private async checkLevelUp(pokemon: OwnPokemon): Promise<void> {
    if (
      pokemon.attributes.currentExperience >=
      pokemon.attributes.nextLevelExperience
    ) {
      pokemon.attributes.level += 1;
    }
  }

  private validateTeam(team: OwnPokemon[]): void {
    if (team.length === 0) throw new Error("No pokemon in team");
  }

  private isAlive(pokemon: OwnPokemon): boolean {
    return !pokemon.isFainted;
  }
}
