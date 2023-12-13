export enum StatKey {
  health = "health",
  attack = "attack",
  defense = "defense",
  specialAttack = "specialAttack",
  specialDefense = "specialDefense",
  speed = "speed",
}

export type StatKeyWithoutHealth = Exclude<StatKey, StatKey.health>;

export type PokemonStat = {
  value: number;
  iv: number;
  ev: number;
  nv: number;
};

export type PokemonStatsBaseData = {
  health: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

export type PokemonStatsData = {
  baseStats: PokemonStatsBaseData;
  stats: PokemonStats;
  level: number;
  currentExperience: number;
  nextLevelExperience: number;
};

export type PokemonStats = {
  health: PokemonStat;
  attack: PokemonStat;
  defense: PokemonStat;
  specialAttack: PokemonStat;
  specialDefense: PokemonStat;
  speed: PokemonStat;
};
