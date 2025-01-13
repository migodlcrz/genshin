export interface Character {
  id: string;
  name: string;
  vision: string; // Element type: e.g., Pyro, Cryo
  weapon: string; // Weapon type: e.g., Sword, Bow
  nation: string; // Nation: e.g., Mondstadt, Liyue
  affiliation: string; // Affiliation: e.g., Knights of Favonius
  rarity: number; // Rarity (Stars): 4 or 5
  constellation: string; // Constellation name
  birthday?: string; // Format: YYYY-MM-DD
  description: string;
}

export interface Weapon {
  id: string;
  name: string;
  type: string; // Weapon type: e.g., Sword, Claymore
  rarity: number; // Rarity (Stars): 3, 4, or 5
  baseAttack: number;
  subStat: string; // Secondary stat: e.g., ATK%, CRIT Rate
  passiveName: string; // Weapon passive name
  passiveDescription: string; // Description of the weapon effect
  description: string;
}

export interface genshinCollection<T> {
  rarity3: T[];
  rarity4: T[];
  rarity5: T[];
}

export type T = Character | Weapon;

export interface PitySystem {
  standard4star: number;
  standard5star: number;
  weapon4star: number;
  weapon5star: number;
}

export const startingPity: PitySystem = {
  standard4star: 0,
  standard5star: 0,
  weapon4star: 0,
  weapon5star: 0,
};
