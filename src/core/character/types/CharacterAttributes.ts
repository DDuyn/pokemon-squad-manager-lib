export type CharacterAttributes = {
  primary: PrimaryAttributes;
  combat: CombatAttributes;
  utility: UtilityAttributes;
};

export type PrimaryAttributes = {
  strength: number;
  dexterity: number;
  intelligence: number;
  vitality: number;
};

export type CombatAttributes = {
  physicalDamage: number;
  physicalDefense: number;
  magicalDamage: number;
  magicalDefense: number;
  agility: number;
  health: number;
  energy: number;
};

export type UtilityAttributes = {
  level: number;
  totalExperience: number;
  neededExperience: number;
};
