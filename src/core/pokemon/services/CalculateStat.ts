import { NatureEffect, Natures } from "../types/pokemon/PokemonNatures";
import {
  PokemonStat,
  StatKey,
  StatKeyWithoutHealth,
} from "../types/pokemon/PokemonStats";

export const calculateStat = (
  data: {
    stat: PokemonStat;
    nature: Natures;
    level: number;
  },
  statKey: StatKey
): number => {
  const { stat, nature, level } = data;
  const base = calculateBaseStat(stat, level);

  const natureEffect = getEffectNature(nature, statKey as StatKeyWithoutHealth);
  const naturalValue = calculateNaturalValue(stat.nv, level);
  return Math.floor((base + 5) * natureEffect + naturalValue);
};

export const calculateHealthStat = (data: {
  stat: PokemonStat;
  level: number;
}): number => {
  const { stat, level } = data;
  const base = calculateBaseStat(stat, level);
  const naturalValue = calculateNaturalValue(stat.nv, level);
  return Math.floor(base + level + 10 + naturalValue);
};

const getEffectNature = (
  nature: Natures,
  stat: StatKeyWithoutHealth
): number => {
  const effect = NatureEffect[nature];
  return effect[stat];
};

const calculateNaturalValue = (nv: number, level: number): number => {
  return (level * nv) / 100;
};

const calculateBaseStat = (baseStat: PokemonStat, level: number): number => {
  const { value, iv, ev } = baseStat;
  const base = ((2 * value + iv + ev / 4) * level) / 100;

  return Math.floor(base);
};

//TODO: Revisar
/*
let totalEVs = 0;
const stats = [StatKey.hp, StatKey.attack, StatKey.defense, StatKey.specialAttack, StatKey.specialDefense, StatKey.speed];

for (const statKey of stats) {
  const maxEVsForStat = Math.min(252, 510 - totalEVs);
  const ev = getRandomNumber(0, maxEVsForStat);
  totalEVs += ev;

  // Asigna los EVs a la estadística correspondiente
  pokemon[statKey].ev = ev;
}
*/
