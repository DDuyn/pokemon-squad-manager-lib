import { injectable } from "inversify";
import { CycleName } from "../models/LocationTypes";

@injectable()
export class GetCycleName {
  async execute(): Promise<CycleName> {
    const currentHour = new Date().getHours();

    const dayStart = 6;
    const nightStart = 18;

    return currentHour >= dayStart && currentHour < nightStart
      ? "day"
      : "night";
  }
}
