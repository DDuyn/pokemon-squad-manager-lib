import { getRandomToList } from "@shared/services";

export const generateRandomName = (): string => {
  const names = [
    "Vin",
    "Kelsier",
    "Elend",
    "Sazed",
    "Spook",
    "Breeze",
    "Ham",
    "Marsh",
    "TenSoon",
    "OreSeur",
    "Rashek",
    "Yomen",
    "Zane",
    "Demoux",
    "Clubs",
    "Dockson",
    "Cett",
    "Straff",
    "Beldre",
    "Hammond",
    "Lord Ruler",
    "Kwaan",
    "Alendi",
    "Jastes Lekal",
    "Ashweather Cett",
  ];

  return getRandomToList(names);
};
