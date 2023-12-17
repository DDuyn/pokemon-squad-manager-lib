export type Location = {
  name: string;
  routes: Route[];
};

export type Route = {
  name: string;
  level: LevelRange;
  cycle: Cycle;
};

export type LevelRange = {
  min: number;
  max: number;
};

export type Cycle = {
  day: PokemonEncounters;
  night: PokemonEncounters;
};

export type CycleName = keyof Cycle;

export type PokemonEncounters = {
  pokemons: PokemonEncounter[];
};

export type PokemonEncounter = {
  name: string;
  encounterRate: number;
};
