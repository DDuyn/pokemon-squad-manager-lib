import {
  CycleName,
  LevelRange,
  PokemonEncounter,
  Route,
} from "./LocationTypes";

export type LocationRequest = {
  id: string;
  name: string;
  routes: Route[];
};

export class Location {
  private id: string;
  private name: string;
  private routes: Route[];

  constructor(args: LocationRequest) {
    this.id = args.id;
    this.name = args.name;
    this.routes = args.routes;
  }

  get Id(): string {
    return this.id;
  }

  get Name(): string {
    return this.name;
  }

  get Routes(): Route[] {
    return this.routes;
  }

  getLevelRange(routeId: string): LevelRange {
    const route = this.getRoute(routeId);
    return route.level;
  }

  getPokemons(routeId: string, cycle: CycleName): PokemonEncounter[] {
    const route = this.getRoute(routeId);
    return route.cycle[cycle].pokemons;
  }

  private getRoute(routeId: string): Route {
    const route = this.routes.find((route) => route.id === routeId);

    if (!route) {
      throw new Error(`Route ${route} not found`); //TODO: Crear excepción Not Found
    }

    return route;
  }
}
