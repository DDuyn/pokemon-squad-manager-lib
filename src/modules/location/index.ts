import { ContainerModule } from "inversify";
import { LOCATION_DI_TYPES } from "./config/DependencyInjection";
import { LocationJsonRepository } from "./repositories/LocationJsonRepository";
import { LocationRepository } from "./repositories/LocationRepository";
import { GetCycleName } from "./services/GetCycleName";
import { GetLocationById } from "./services/GetLocationById";

export const locationModule = new ContainerModule((bind) => {
  bind<LocationRepository>(LOCATION_DI_TYPES.LocationRepository).to(
    LocationJsonRepository
  );
  bind<GetLocationById>(LOCATION_DI_TYPES.GetLocationById).to(GetLocationById);
  bind<GetCycleName>(LOCATION_DI_TYPES.GetCycleName).to(GetCycleName);
});
