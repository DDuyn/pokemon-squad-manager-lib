import {
  Gender,
  Natures,
  PokemonAbilities,
  PokemonBasicInfo,
  PokemonDetailInfo,
  PokemonMovesData,
  PokemonStats,
  PokemonStatsBase,
  PokemonTypes,
} from "./PokemonTypes";

export type PokemonRequest = {
  id: string;
  name: string;
  types: PokemonTypes;
  nature: Natures;
  gender: Gender;
  detailInfo: PokemonDetailInfo;
  stats: {
    base: PokemonStatsBase;
    current: PokemonStats;
  };
  moves: PokemonMovesData;
  ability: PokemonAbilities;
  isWild: boolean;
};

export class Pokemon {
  private id: string;
  private name: string;
  private types: PokemonTypes;
  private nature: Natures;
  private gender: Gender;

  private detailInfo: PokemonDetailInfo;

  private stats: {
    base: PokemonStatsBase;
    current: PokemonStats;
  };

  private moves: PokemonMovesData;
  private ability: PokemonAbilities;
  private isWild: boolean = false;

  constructor(args: PokemonRequest) {
    this.id = args.id;
    this.name = args.name;
    this.types = args.types;
    this.nature = args.nature;
    this.gender = args.gender;
    this.detailInfo = args.detailInfo;
    this.stats = args.stats;
    this.moves = args.moves;
    this.ability = args.ability;
    this.isWild = args.isWild ?? this.isWild;
  }

  get DetailInfo(): PokemonDetailInfo {
    return this.detailInfo;
  }

  get Ability(): string {
    return this.ability.selectedAbility;
  }

  get Id(): string {
    return this.id;
  }

  get Name(): string {
    return this.name;
  }

  get Types(): PokemonTypes {
    return this.types;
  }

  get Moves(): PokemonMovesData {
    return this.moves;
  }

  get BasicInfo(): PokemonBasicInfo {
    return {
      id: this.id,
      name: this.name,
      types: this.types,
      nature: this.nature,
      gender: this.gender,
    };
  }

  get Stats(): {
    base: PokemonStatsBase;
    current: PokemonStats;
  } {
    return this.stats;
  }
}
