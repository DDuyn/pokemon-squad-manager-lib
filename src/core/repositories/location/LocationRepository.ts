import { Location } from "../../types/location/Location";

export interface LocationRepository {
  getLocation(location: string): Promise<Location>;
}
