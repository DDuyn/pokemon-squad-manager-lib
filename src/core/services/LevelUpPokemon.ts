import { TYPES } from "@config/Types";
import { CalculateExperienceFactory } from "@core/factories/experience/CalculateExperienceFactory";
import { OwnPokemon } from "@core/types/pokemon/PokemonData";
import { inject, injectable } from "inversify";

@injectable()
export class LevelUpPokemon {
  constructor(
    @inject(TYPES.CalculateExperienceFactory)
    private readonly calculateExperienceFactory: CalculateExperienceFactory
  ) {}

  async execute(pokemon: OwnPokemon, levelUp: number): Promise<OwnPokemon> {
    const { attributes } = pokemon;
    const level = attributes.level + levelUp;

    pokemon.attributes.nextLevelExperience =
      this.calculateExperienceFactory.execute(
        level + 1,
        pokemon.detail.growthRate
      );

    return pokemon;
  }
}
