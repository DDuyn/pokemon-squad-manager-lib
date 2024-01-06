export type PokemonDetailInfo = {
  growthRate: GrowthRates;
  catchRate: number;
  genderRatio: number;
  eggCycles: number;
  baseExperience: number;
};

export type PokemonBasicInfo = {
  id: string;
  name: string;
  types: PokemonTypes;
  nature: Natures;
  gender: Gender;
};

export type PokemonAttribute = {
  value: number;
  iv: number;
  ev: number;
  nv: number;
};

export type PokemonAttributes = {
  health: PokemonAttribute;
  attack: PokemonAttribute;
  defense: PokemonAttribute;
  specialAttack: PokemonAttribute;
  specialDefense: PokemonAttribute;
  speed: PokemonAttribute;
};

export type PokemonStats = {
  attributes: PokemonAttributes;
  level: number;
  currentExperience: number;
  nextLevelExperience: number;
};

export type PokemonStatsBase = {
  health: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

export enum PokemonType {
  Normal = "Normal",
  Fire = "Fire",
  Water = "Water",
  Electric = "Electric",
  Grass = "Grass",
  Ice = "Ice",
  Fighting = "Fighting",
  Poison = "Poison",
  Ground = "Ground",
  Flying = "Flying",
  Psychic = "Psychic",
  Bug = "Bug",
  Rock = "Rock",
  Ghost = "Ghost",
  Dragon = "Dragon",
  Dark = "Dark",
  Steel = "Steel",
  Fairy = "Fairy",
}

export type PokemonTypes = {
  primary: PokemonType;
  secondary: PokemonType | null;
};

export type StatKeyWithoutHealth = Exclude<StatKey, StatKey.health>;
export enum StatKey {
  health = "health",
  attack = "attack",
  defense = "defense",
  specialAttack = "specialAttack",
  specialDefense = "specialDefense",
  speed = "speed",
}

export enum Natures {
  Hardy = "Hardy",
  Lonely = "Lonely",
  Brave = "Brave",
  Adamant = "Adamant",
  Naughty = "Naughty",
  Bold = "Bold",
  Docile = "Docile",
  Relaxed = "Relaxed",
  Impish = "Impish",
  Lax = "Lax",
  Timid = "Timid",
  Hasty = "Hasty",
  Serious = "Serious",
  Jolly = "Jolly",
  Naive = "Naive",
  Modest = "Modest",
  Mild = "Mild",
  Quiet = "Quiet",
  Bashful = "Bashful",
  Rash = "Rash",
  Calm = "Calm",
  Gentle = "Gentle",
  Sassy = "Sassy",
  Careful = "Careful",
  Quirky = "Quirky",
}

export type NatureModifier = {
  [key in StatKey]: number;
};

export const NatureEffect: Record<Natures, NatureModifier> = {
  Hardy: {
    health: 1,
    attack: 1,
    defense: 1,
    specialAttack: 1,
    specialDefense: 1,
    speed: 1,
  },
  Lonely: {
    health: 1,
    attack: 1.1,
    defense: 0.9,
    specialAttack: 1,
    specialDefense: 1,
    speed: 1,
  },
  Brave: {
    health: 1,
    attack: 1.1,
    defense: 1,
    specialAttack: 1,
    specialDefense: 1,
    speed: 0.9,
  },
  Adamant: {
    health: 1,
    attack: 1.1,
    defense: 1,
    specialAttack: 0.9,
    specialDefense: 1,
    speed: 1,
  },
  Naughty: {
    health: 1,
    attack: 1.1,
    defense: 1,
    specialAttack: 1,
    specialDefense: 0.9,
    speed: 1,
  },
  Bold: {
    health: 1,
    attack: 0.9,
    defense: 1.1,
    specialAttack: 1,
    specialDefense: 1,
    speed: 1,
  },
  Docile: {
    health: 1,
    attack: 1,
    defense: 1,
    specialAttack: 1,
    specialDefense: 1,
    speed: 1,
  },
  Relaxed: {
    health: 1,
    attack: 1,
    defense: 1.1,
    specialAttack: 1,
    specialDefense: 1,
    speed: 0.9,
  },
  Impish: {
    health: 1,
    attack: 1,
    defense: 1.1,
    specialAttack: 0.9,
    specialDefense: 1,
    speed: 1,
  },
  Lax: {
    health: 1,
    attack: 1,
    defense: 1.1,
    specialAttack: 1,
    specialDefense: 0.9,
    speed: 1,
  },
  Timid: {
    health: 1,
    attack: 0.9,
    defense: 1,
    specialAttack: 1,
    specialDefense: 1,
    speed: 1.1,
  },
  Hasty: {
    health: 1,
    attack: 1,
    defense: 0.9,
    specialAttack: 1,
    specialDefense: 1,
    speed: 1.1,
  },
  Serious: {
    health: 1,
    attack: 1,
    defense: 1,
    specialAttack: 1,
    specialDefense: 1,
    speed: 1,
  },
  Jolly: {
    health: 1,
    attack: 1,
    defense: 1,
    specialAttack: 0.9,
    specialDefense: 1,
    speed: 1.1,
  },
  Naive: {
    health: 1,
    attack: 1,
    defense: 1,
    specialAttack: 1,
    specialDefense: 0.9,
    speed: 1.1,
  },
  Modest: {
    health: 1,
    attack: 0.9,
    defense: 1,
    specialAttack: 1.1,
    specialDefense: 1,
    speed: 1,
  },
  Mild: {
    health: 1,
    attack: 1,
    defense: 0.9,
    specialAttack: 1.1,
    specialDefense: 1,
    speed: 1,
  },
  Quiet: {
    health: 1,
    attack: 1,
    defense: 1,
    specialAttack: 1.1,
    specialDefense: 1,
    speed: 0.9,
  },
  Bashful: {
    health: 1,
    attack: 1,
    defense: 1,
    specialAttack: 1,
    specialDefense: 1,
    speed: 1,
  },
  Rash: {
    health: 1,
    attack: 1,
    defense: 1,
    specialAttack: 1.1,
    specialDefense: 0.9,
    speed: 1,
  },
  Calm: {
    health: 1,
    attack: 0.9,
    defense: 1,
    specialAttack: 1,
    specialDefense: 1.1,
    speed: 1,
  },
  Gentle: {
    health: 1,
    attack: 1,
    defense: 0.9,
    specialAttack: 1,
    specialDefense: 1.1,
    speed: 1,
  },
  Sassy: {
    health: 1,
    attack: 1,
    defense: 1,
    specialAttack: 1,
    specialDefense: 1.1,
    speed: 0.9,
  },
  Careful: {
    health: 1,
    attack: 1,
    defense: 1,
    specialAttack: 0.9,
    specialDefense: 1.1,
    speed: 1,
  },
  Quirky: {
    health: 1,
    attack: 1,
    defense: 1,
    specialAttack: 1,
    specialDefense: 1,
    speed: 1,
  },
};

export type PokemonMovesData = {
  selectedMoves: string[];
  learnableMoves: string[];
};

export type PokemonJson = {
  name: string;
  types: PokemonTypes;
  baseStats: PokemonStatsBase;
  abilities: string[];
  genderRatio: number;
  catchRate: number;
  eggCycles: number;
  baseExp: number;
};

export enum GrowthRates {
  Erratic = "Erratic",
  Fast = "Fast",
  MediumFast = "Medium Fast",
  MediumSlow = "Medium Slow",
  Slow = "Slow",
  Fluctuating = "Fluctuating",
}

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export type PokemonAbilities = {
  selectedAbility: string;
  availableAbilities: string[];
};

export type PokemonAbilitiesBase = {
  availableAbilities: string[];
};

export type PokemonCombatStats = {
  currentHealth: number;
  status: string; //TODO: Normalizar
  attributes: PokemonAttributes;
  isFainted: boolean;
  isParticipating: boolean;
  partyPosition: number;
};
