import { EnemyPokemon } from "@core/types/pokemon/PokemonData";
import { injectable } from "inversify";

@injectable()
export class GainExperiencePokemon {
  constructor() {}

  async execute(
    enemy: EnemyPokemon,
    isParticipating: boolean,
    isShareExperience: boolean
  ): Promise<number> {
    const { isWild, detail, attributes } = enemy;
    const baseExperience = detail.baseExperience;
    const level = attributes.level;

    const a = isWild ? 1 : 1.5;
    const s = isParticipating || !isShareExperience ? 1 : 2;

    return Math.floor((baseExperience * level) / (7 * s * a));
  }
}
