import { TYPES } from "@config/Types";
import { inject, injectable } from "inversify";
import { LocationRepository } from "../repositories/location/LocationRepository";
import {
  Cycle,
  CycleName,
  LevelRange,
  PokemonEncounter,
} from "../types/location/Location";

@injectable()
export class GetAvailablePokemons {
  constructor(
    @inject(TYPES.LocationRepository)
    private readonly locationRepository: LocationRepository
  ) {}

  async execute(
    locationName: string,
    routeName: string
  ): Promise<{
    availablePokemons: PokemonEncounter[];
    levelRange: LevelRange;
  }> {
    const location = await this.locationRepository.getLocation(locationName);
    const route = location.routes.find((route) => route.name === routeName);

    if (!route) {
      throw new Error(`Route ${route} not found`); //TODO: Crear excepción Not Found
    }

    const cycleName = this.getCycleName();

    return {
      availablePokemons: route.cycle[cycleName as keyof Cycle].pokemons,
      levelRange: route.level,
    };
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
