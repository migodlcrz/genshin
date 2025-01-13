import scene from "./assets/images/scene.jpg";
import primogem from "./assets/images/primogem.png";
import logo from "./assets/images/logo.png";
import { useEffect, useState } from "react";
import {
  Character,
  genshinCollection,
  pitySystem,
  startingPity,
  T,
  Weapon,
} from "./types";
import {
  createCollection,
  getRandomIndex,
  getRandomNumber,
  isCharacterItem,
} from "./functions";

function App() {
  const [isHome, setHome] = useState<Boolean>(false);
  const [isCurrency, setCurrency] = useState<number>(32000);
  const [isGenshinCollection, setGenshinCollection] =
    useState<genshinCollection<T> | null>();
  const [isCharacter, setCharacter] = useState<Character | null>();
  const [isWeapon, setWeapon] = useState<Weapon | null>();
  const [isPitySystem, setPitySystem] = useState<pitySystem | null>(
    startingPity
  );

  const fetchData = async () => {
    try {
      const resChar = await fetch(`https://genshin.jmp.blue/characters/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resWeap = await fetch(`https://genshin.jmp.blue/weapons/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resChar.ok || !resWeap.ok) throw new Error("API no work bruh");
      const responseChar = await resChar.json();
      const responseWeap = await resWeap.json();

      const collection = createCollection([responseChar, responseWeap]);
      setGenshinCollection(collection);
    } catch (e) {
      console.log("Error fetch data:", e);
      return e;
    }
  };

  const standardWish = () => {
    try {
      setCurrency(isCurrency - 160);
      if (!isGenshinCollection) throw new Error("No Genshin Data");
      if (!isPitySystem) throw new Error("Pity System not Initialized");
      // PITY SYSTEM
      if (isPitySystem.standard5star >= 80) {
        const index = getRandomIndex(isGenshinCollection.rarity5);
        const item = isGenshinCollection.rarity5[index];
        if (isCharacterItem(item)) {
          setCharacter(item);
        } else {
          setWeapon(item);
        }
        setPitySystem({
          ...(isPitySystem as pitySystem),
          standard4star: isPitySystem.standard4star + 1,
          standard5star: 0,
        });
        return item;
      } else if (isPitySystem.standard4star >= 10) {
        const index = getRandomIndex(isGenshinCollection.rarity4);
        const item = isGenshinCollection.rarity4[index];
        if (isCharacterItem(item)) {
          setCharacter(item);
        } else {
          setWeapon(item);
        }
        setPitySystem({
          ...(isPitySystem as pitySystem),
          standard4star: 0,
          standard5star: isPitySystem.standard5star + 1,
        });
        return item;
      }

      // MAY THE ODDS BE EVER IN YOUR FAVOR. GAMBAAAAAA!!!!
      const odds = getRandomNumber();
      if (odds <= 94.3) {
        const index = getRandomIndex(isGenshinCollection.rarity3);
        const item = isGenshinCollection.rarity3[index];
        if (isCharacterItem(item)) {
          setCharacter(item);
        } else {
          setWeapon(item);
        }
        setPitySystem({
          ...(isPitySystem as pitySystem),
          standard4star: isPitySystem.standard4star + 1,
          standard5star: isPitySystem.standard5star + 1,
        });
        return item;
      } else if (odds <= 99.4) {
        const index = getRandomIndex(isGenshinCollection.rarity4);
        const item = isGenshinCollection.rarity4[index];
        if (isCharacterItem(item)) {
          setCharacter(item);
        } else {
          setWeapon(item);
        }
        setPitySystem({
          ...(isPitySystem as pitySystem),
          standard4star: 0,
          standard5star: isPitySystem.standard5star + 1,
        });
        return item;
      } else {
        const index = getRandomIndex(isGenshinCollection.rarity5);
        const item = isGenshinCollection.rarity5[index];
        if (isCharacterItem(item)) {
          setCharacter(item);
        } else {
          setWeapon(item);
        }
        setPitySystem({
          ...(isPitySystem as pitySystem),
          standard4star: isPitySystem.standard4star + 1,
          standard5star: 0,
        });
        return item;
      }
    } catch (e) {
      console.log("Error Standard Wish:", e);
    }
  };
  const weaponWish = () => {
    try {
      setCurrency(isCurrency - 160);
      if (!isGenshinCollection) throw new Error("No Genshin Data");
      if (!isPitySystem) throw new Error("Pity System not Initialized");
      // PITY SYSTEM
      if (isPitySystem.weapon5star >= 80) {
        const index = getRandomIndex(isGenshinCollection.rarity5);
        const item = isGenshinCollection.rarity5[index];
        if (isCharacterItem(item)) {
          setCharacter(item);
        } else {
          setWeapon(item);
        }
        setPitySystem({
          ...(isPitySystem as pitySystem),
          weapon4star: isPitySystem.weapon4star + 1,
          weapon5star: 0,
        });
        return item;
      } else if (isPitySystem.weapon4star >= 10) {
        const index = getRandomIndex(isGenshinCollection.rarity4);
        const item = isGenshinCollection.rarity4[index];
        if (isCharacterItem(item)) {
          setCharacter(item);
        } else {
          setWeapon(item);
        }
        setPitySystem({
          ...(isPitySystem as pitySystem),
          weapon4star: 0,
          weapon5star: isPitySystem.weapon5star + 1,
        });
        return item;
      }

      // MAY THE ODDS BE EVER IN YOUR FAVOR. GAMBAAAAAA!!!!
      const odds = getRandomNumber();
      if (odds <= 94.3) {
        const index = getRandomIndex(isGenshinCollection.rarity3);
        const item = isGenshinCollection.rarity3[index];
        if (isCharacterItem(item)) {
          setCharacter(item);
        } else {
          setWeapon(item);
        }
        setPitySystem({
          ...(isPitySystem as pitySystem),
          weapon4star: isPitySystem.weapon4star + 1,
          weapon5star: isPitySystem.weapon5star + 1,
        });
        return item;
      } else if (odds <= 99.4) {
        const index = getRandomIndex(isGenshinCollection.rarity4);
        const item = isGenshinCollection.rarity4[index];
        if (isCharacterItem(item)) {
          setCharacter(item);
        } else {
          setWeapon(item);
        }
        setPitySystem({
          ...(isPitySystem as pitySystem),
          weapon4star: 0,
          weapon5star: isPitySystem.weapon5star + 1,
        });
        return item;
      } else {
        const index = getRandomIndex(isGenshinCollection.rarity5);
        const item = isGenshinCollection.rarity5[index];
        if (isCharacterItem(item)) {
          setCharacter(item);
        } else {
          setWeapon(item);
        }
        setPitySystem({
          ...(isPitySystem as pitySystem),
          weapon4star: isPitySystem.weapon4star + 1,
          weapon5star: 0,
        });
        return item;
      }
    } catch (e) {
      console.log("Error Weapon Wish:", e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="flex items-center justify-center w-screen h-screen bg-cover p-10"
      style={{ backgroundImage: `url(${scene})` }}
    >
      {isHome && isGenshinCollection ? (
        <div className="w-full h-full">
          <div className="flex flex-col w-full h-full items-center justify-start bg-white/50 rounded-3xl p-3">
            <div className="flex flex-row w-full h-20 space-x-4">
              <div className="flex h-full w-1/2 justify-between items-center py-2">
                <div className="flex flex-row w-1/3 h-full p-3 bg-slate-200 border-4 border-slate-400 rounded-xl items-center space-x-2 shadow-inner shadow-black">
                  <img src={primogem} className="h-full" />
                  <div className="flex items-center justify-center text-2xl font-bold">
                    {isCurrency}
                  </div>
                </div>
                <button
                  className="flex flex-row w-1/3 h-full p-1 bg-orange-100 border-4 border-orange-300 rounded-xl items-center justify-center font-bold text-xl"
                  onClick={() => console.log(standardWish())}
                >
                  Standard Wish
                </button>
              </div>
              <div className="flex h-full w-1/2 py-2 justify-between items-center">
                <button
                  className="flex flex-row w-1/3 h-full p-1 bg-orange-100 border-4 border-orange-300 rounded-xl items-center justify-center font-bold text-xl"
                  onClick={() => console.log(weaponWish())}
                >
                  Weapon Wish
                </button>
                <div className="flex flex-row w-1/3 h-full p-1 bg-slate-200 border-4 border-slate-400 rounded-xl items-center shadow-inner shadow-black">
                  Wish Count
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full h-full">
              <div className="flex flex-col w-full h-full bg-green-400"></div>
            </div>
          </div>
          {/* <img src={primogem} className="h-10 w-10" />

      <h1 className="font-bold">hello</h1>
      <div></div> */}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <img src={logo} className="" />
          <button
            onClick={() => setHome(true)}
            className="bg-orange-200 border-4 border-orange-400 px-3 py-2 font-bold rounded-lg shadow-lg shadow-black hover:bg-orange-300 transition-all"
          >
            Start Wishing
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
