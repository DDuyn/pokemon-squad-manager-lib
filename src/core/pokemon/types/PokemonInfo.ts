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

export type PokemonInfo = {
  name: string;
  types: PokemonTypes;
  catchRate: number;
  genderRatio: number;
  growthRate: GrowthRate;
  eggCycles: number;
};

export type PokemonTypes = {
  primary: PokemonType;
  secondary: PokemonType | null;
};

export type GrowthRate =
  | "Erratic"
  | "Fast"
  | "Medium Fast"
  | "Medium Slow"
  | "Slow"
  | "Fluctuating";
