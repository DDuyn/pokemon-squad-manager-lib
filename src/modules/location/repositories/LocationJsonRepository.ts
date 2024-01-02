import { SHARED_DI_TYPES } from "@shared/config/DependencyInjection";
import { Cache } from "@shared/services/cache/Cache";
import { Logger } from "@shared/services/logger/interfaces/Logger";
import { JsonReader } from "@shared/services/reader/JsonReader";
import { inject, injectable } from "inversify";
import path from "path";
import { LocationJson } from "../models/LocationTypes";
import { LocationRepository } from "./LocationRepository";

@injectable()
export class LocationJsonRepository implements LocationRepository {
  private readonly locationDataDir = path.resolve(
    import.meta.dir,
    "../data" //TODO: Crear variable de entorno para la ruta de los datos
  );

  constructor(
    @inject(SHARED_DI_TYPES.Logger) private readonly logger: Logger,
    @inject(SHARED_DI_TYPES.Reader) private readonly jsonReader: JsonReader,
    @inject(SHARED_DI_TYPES.Cache) private readonly cache: Cache<LocationJson>
  ) {}

  async getLocation(location: string): Promise<LocationJson> {
    const cachedLocation = await this.cache.get(location);

    if (cachedLocation) {
      await this.logger.info({
        message: `Location ${location} readed from cache`,
        data: { cachedLocation },
        method: "LocationJsonRepository.getLocation",
      });
      return cachedLocation;
    }

    const locations = await this.jsonReader.readDirAsync(this.locationDataDir);
    const locationFile = locations.find(
      (file) => file.replace(".json", "") === location
    );

    if (!locationFile) {
      this.logger.error({
        message: `Location ${location} not found`,
        data: { location },
        method: "LocationJsonRepository.getLocation",
      });
      throw new Error(`Location ${location} not found`);
    }

    const locationJson = await this.jsonReader.readFileAsync<LocationJson>(
      path.join(this.locationDataDir, locationFile)
    );

    this.cache.set(location, locationJson);

    return locationJson;
  }
}
