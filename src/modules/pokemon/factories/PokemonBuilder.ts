import { randomUUID } from "crypto";
import { inject, injectable } from "inversify";
import { getRandomToList } from "../../shared/services/GetRandomToList";
import { POKEMON_DI_TYPES } from "../config/DependencyInjection";
import { Pokemon } from "../models/Pokemon";
import {
  Gender,
  GrowthRates,
  Natures,
  PokemonJson,
} from "../models/PokemonTypes";
import { GeneratePokemonStats } from "../services/GeneratePokemonStats";

@injectable()
export class PokemonBuilder {
  private pokemon: Pokemon = {} as Pokemon;
  private pokemonData: PokemonJson = {} as PokemonJson;

  constructor(
    @inject(POKEMON_DI_TYPES.GeneratePokemonStats)
    private readonly generatePokemonStats: GeneratePokemonStats
  ) {}

  setPokemonData(pokemonData: PokemonJson): PokemonBuilder {
    this.pokemonData = pokemonData;
    return this;
  }

  setName(name: string): PokemonBuilder {
    this.pokemon.name = name;
    return this;
  }

  setIsWild(): PokemonBuilder {
    this.pokemon.isWild = true;
    return this;
  }

  setTypes(): PokemonBuilder {
    this.pokemon.types = this.pokemonData.types;
    return this;
  }

  setId(): PokemonBuilder {
    this.pokemon.id = randomUUID();
    return this;
  }

  setGender(): PokemonBuilder {
    console.log(this.pokemonData);
    this.pokemon.gender =
      Math.random() * 100 < this.pokemonData.genderRatio
        ? Gender.Male
        : Gender.Female;

    return this;
  }

  setDetailInfo(): PokemonBuilder {
    this.pokemon.detailInfo = {
      catchRate: this.pokemonData.catchRate,
      eggCycles: this.pokemonData.eggCycles,
      baseExperience: this.pokemonData.baseExp,
      genderRatio: this.pokemonData.genderRatio,
      growthRate: getRandomToList<GrowthRates>(Object.values(GrowthRates)),
    };

    return this;
  }

  setAbility(): PokemonBuilder {
    this.pokemon.ability = {
      selectedAbility: getRandomToList(this.pokemonData.abilities),
      availableAbilities: this.pokemonData.abilities,
    };

    return this;
  }

  setMoves(): PokemonBuilder {
    this.pokemon.moves = { learnableMoves: [], selectedMoves: [] };
    return this;
  }

  setNature(): PokemonBuilder {
    this.pokemon.nature = getRandomToList(Object.values(Natures));
    return this;
  }

  setStats(level: number): PokemonBuilder {
    const stats = this.generatePokemonStats.execute({
      baseStats: this.pokemonData.baseStats,
      growthRate: this.pokemon.detailInfo.growthRate,
      level,
      nature: this.pokemon.nature,
    });

    this.pokemon.stats = {
      base: this.pokemonData.baseStats,
      current: stats,
    };

    return this;
  }

  setCombatStats(): PokemonBuilder {
    this.pokemon.combatStats = {
      currentHealth: this.pokemon.stats.current.attributes.health.value,
      status: "Normal",
      attributes: this.pokemon.stats.current.attributes,
      isParticipating: false,
      partyPosition: 0,
      isFainted: false,
    };

    return this;
  }

  build(): Pokemon {
    return this.pokemon;
  }
}
