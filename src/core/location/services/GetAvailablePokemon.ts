import { TYPES } from "@config/Types";
import { inject, injectable } from "inversify";
import { LocationRepository } from "../repository/LocationRepository";
import { Cycle, CycleName, PokemonEncounters } from "../types/Location";

@injectable()
export class GetAvailablePokemons {
  constructor(
    @inject(TYPES.LocationRepository)
    private readonly locationRepository: LocationRepository
  ) {}

  async execute(
    locationName: string,
    routeName: string
  ): Promise<PokemonEncounters> {
    const location = await this.locationRepository.getLocation(locationName);
    const route = location.routes.find((route) => route.name === routeName);

    if (!route) {
      throw new Error(`Route ${route} not found`); //TODO: Crear excepción NOt Found
    }

    const cycleName = this.getCycleName();

    return route.cycle[cycleName as keyof Cycle];
  }

  private getCycleName(): CycleName {
    const currentHour = new Date().getHours();

    const dayStart = 6;
    const nightStart = 18;

    return currentHour >= dayStart && currentHour < nightStart
      ? "day"
      : "night";
  }
}
