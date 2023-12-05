import { RangeNumber } from "@shared/types";
import { CombatAttributes, PrimaryAttributes } from "./CharacterAttributes";

export type AttributeCategories = {
  primary: AttributeRanges<PrimaryAttributes>;
  combat: AttributeRanges<Omit<CombatAttributes, "health">>;
};

export type AttributeRanges<T> = {
  [K in keyof T]: RangeNumber;
};
