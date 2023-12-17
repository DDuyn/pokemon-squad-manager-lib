import { Location } from "../types/Location";

export interface LocationRepository {
  getLocation(location: string): Promise<Location>;
}
