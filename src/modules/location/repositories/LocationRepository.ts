import { LocationJson } from "../models/LocationTypes";

export interface LocationRepository {
  getLocation(location: string): Promise<LocationJson>;
}
