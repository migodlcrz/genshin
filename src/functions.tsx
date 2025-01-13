import { Character, genshinCollection, T, Weapon } from "./types";

export const getRandomNumber = () => {
  const randomNum = Math.random() * (100 - 1) + 1; // Generates a number between 1 and 100
  return Math.round(randomNum * 10) / 10; // Rounds to one decimal place
};
export const getRandomIndex = (array: any[]) => {
  return Math.floor(Math.random() * array.length);
};
export const createCollection = (items: Array<T[]>): genshinCollection<T> => {
  const allItems = items.flat();

  return {
    rarity3: allItems.filter((item) => item.rarity === 3),
    rarity4: allItems.filter((item) => item.rarity === 4),
    rarity5: allItems.filter((item) => item.rarity === 5),
  };
};

export const isCharacterItem = (item: any): item is Character => {
  return (item as Character).vision !== undefined;
};

// Type Guard to check if item is a Weapon
export const isWeaponItem = (item: any): item is Weapon => {
  return (item as Weapon).baseAttack !== undefined;
};

export const getRandomItem = (items: T[]) => {
  const index = getRandomIndex(items);
  return items[index];
};
