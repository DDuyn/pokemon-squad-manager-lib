import { TYPES } from "@config/Types";
import { Logger } from "@core/shared/services/logger/interfaces/Logger";
import { JsonReader } from "@core/shared/services/reader/JsonReader";
import { inject, injectable } from "inversify";
import path from "path";
import { Location } from "../types/Location";
import { LocationRepository } from "./LocationRepository";

@injectable()
export class LocationJsonRepository implements LocationRepository {
  private readonly locationDataDir = path.resolve(
    import.meta.dir,
    "../../../data/locations" //TODO: Crear variable de entorno para la ruta de los datos
  );

  constructor(
    @inject(TYPES.Logger) private readonly logger: Logger,
    @inject(TYPES.Reader) private readonly jsonReader: JsonReader
  ) {}

  async getLocation(location: string): Promise<Location> {
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

    return this.jsonReader.readFileAsync<Location>(
      path.join(this.locationDataDir, locationFile)
    );
  }
}
