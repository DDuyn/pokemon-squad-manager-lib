export type Location = {
  name: string;
  routes: Route[];
};

export type Route = {
  name: string;
  cycle: Cycle;
};

export type Cycle = {
  day: PokemonEncounters;
  night: PokemonEncounters;
};

export type CycleName = keyof Cycle;

export type PokemonEncounters = {
  pokemon: PokemonEncounter[];
};

export type PokemonEncounter = {
  name: string;
  encounterRate: number;
};
