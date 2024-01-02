import { SHARED_DI_TYPES } from "@shared/config/DependencyInjection";
import { Logger } from "@shared/services/logger/interfaces/Logger";
import { inject, injectable } from "inversify";
import { LOCATION_DI_TYPES } from "../config/DependencyInjection";
import { Location } from "../models/Location";
import { LocationRepository } from "../repositories/LocationRepository";

@injectable()
export class GetLocationById {
  constructor(
    @inject(LOCATION_DI_TYPES.LocationRepository)
    private readonly locationRepository: LocationRepository,
    @inject(SHARED_DI_TYPES.Logger) private readonly logger: Logger
  ) {}

  async execute(location: string): Promise<Location> {
    const locationJson = await this.locationRepository.getLocation(location);

    return new Location(locationJson);
  }
}
