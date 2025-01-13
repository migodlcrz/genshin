import scene from "./assets/images/scene.jpg";
import primogem from "./assets/images/primogem.png";
import logo from "./assets/images/logo.png";
import { useEffect, useState } from "react";
import { genshinCollection, PitySystem, startingPity, T } from "./types";
import {
  createCollection,
  getRandomItem,
  getRandomNumber,
  isCharacterItem,
} from "./functions";
import StandardPage from "./components/StandardPage";
import WeaponPage from "./components/WeaponPage";

function App() {
  const [isHome, setHome] = useState<Boolean>(false);
  const [isWishing, setWishing] = useState<Boolean>(false);
  const [isCurrency, setCurrency] = useState<number>(32000);
  const [isGenshinCollection, setGenshinCollection] =
    useState<genshinCollection<T> | null>();
  const [isCharacter, setCharacter] = useState<string | null>();
  const [isWeapon, setWeapon] = useState<string | null>();
  const [isPitySystem, setPitySystem] = useState<PitySystem | null>(
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
  const setItem = (item: T) => {
    if (isCharacterItem(item)) {
      setCharacter(`https://genshin.jmp.blue/characters/${item.id}/icon`);
    } else {
      setWeapon(`https://genshin.jmp.blue/weapons/${item.id}/icon`);
    }
  };
  // Helper function to update the pity system
  const updatePitySystem = (
    wishType: string,
    odds4Star: number,
    odds5Star: number
  ) => {
    if (wishType.toLowerCase() === "standard") {
      setPitySystem({
        ...(isPitySystem as PitySystem),
        standard4star: odds4Star,
        standard5star: odds5Star,
      });
    } else if (wishType.toLowerCase() === "weapon") {
      setPitySystem({
        ...(isPitySystem as PitySystem),
        weapon4star: odds4Star,
        weapon5star: odds5Star,
      });
    }
  };
  const standardWish = () => {
    try {
      // Deduct currency
      setCurrency(isCurrency - 160);

      // Ensure necessary data is initialized
      if (!isGenshinCollection) throw new Error("No Genshin Data");
      if (!isPitySystem) throw new Error("Pity System not Initialized");

      // Check for pity guarantees
      if (isPitySystem.standard5star >= 80) {
        const item = getRandomItem(isGenshinCollection.rarity5);
        setItem(item);
        updatePitySystem("standard", isPitySystem.standard4star + 1, 0);
        return item;
      }

      if (isPitySystem.standard4star >= 10) {
        const item = getRandomItem(isGenshinCollection.rarity4);
        setItem(item);
        updatePitySystem("standard", 0, isPitySystem.standard5star + 1);
        return item;
      }

      // Random pull logic
      const odds = getRandomNumber();
      let rarity: keyof genshinCollection<T>;

      if (odds <= 94.3) {
        rarity = "rarity3";
      } else if (odds <= 99.4) {
        rarity = "rarity4";
      } else {
        rarity = "rarity5";
      }

      const item = getRandomItem(isGenshinCollection[rarity]);
      setItem(item);

      if (rarity === "rarity3") {
        updatePitySystem(
          "standard",
          isPitySystem.standard4star + 1,
          isPitySystem.standard5star + 1
        );
      } else if (rarity === "rarity4") {
        updatePitySystem("standard", 0, isPitySystem.standard5star + 1);
      } else {
        updatePitySystem("standard", isPitySystem.standard4star + 1, 0);
      }

      return item;
    } catch (e) {
      console.error("Error Standard Wish:", e);
    }
  };
  const weaponWish = () => {
    try {
      // Deduct currency
      setCurrency(isCurrency - 160);

      // Ensure necessary data is initialized
      if (!isGenshinCollection) throw new Error("No Genshin Data");
      if (!isPitySystem) throw new Error("Pity System not Initialized");

      // Check for pity guarantees
      if (isPitySystem.weapon5star >= 80) {
        const item = getRandomItem(isGenshinCollection.rarity5);
        setItem(item);
        updatePitySystem("weapon", isPitySystem.weapon4star + 1, 0);
        return item;
      }

      if (isPitySystem.weapon4star >= 10) {
        const item = getRandomItem(isGenshinCollection.rarity4);
        setItem(item);
        updatePitySystem("weapon", 0, isPitySystem.weapon5star + 1);
        return item;
      }

      // Random pull logic
      const odds = getRandomNumber();
      let rarity: keyof genshinCollection<T>;

      if (odds <= 94.3) {
        rarity = "rarity3";
      } else if (odds <= 99.4) {
        rarity = "rarity4";
      } else {
        rarity = "rarity5";
      }

      const item = getRandomItem(isGenshinCollection[rarity]);
      setItem(item);

      if (rarity === "rarity3") {
        updatePitySystem(
          "weapon",
          isPitySystem.weapon4star + 1,
          isPitySystem.weapon5star + 1
        );
      } else if (rarity === "rarity4") {
        updatePitySystem("weapon", 0, isPitySystem.weapon5star + 1);
      } else {
        updatePitySystem("weapon", isPitySystem.weapon4star + 1, 0);
      }

      return item;
    } catch (e) {
      console.error("Error Weapon Wish:", e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [page, setPage] = useState<string>("standard");

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
                <div className="flex flex-row w-1/3 h-full p-3 bg-slate-200 border-4 border-slate-400 rounded-full items-center space-x-2 shadow-inner shadow-black">
                  <img src={primogem} className="h-full" />
                  <div className="flex items-center justify-center text-2xl font-bold">
                    {isCurrency}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setPage("standard");
                  }}
                  className={`flex flex-row w-1/3 h-full p-1 ${
                    page === "standard"
                      ? "bg-orange-200 shadow-inner"
                      : "bg-orange-100 shadow-sm"
                  } border-[2px] text-black shadow-black border-orange-400 hover:bg-orange-300 transition-all rounded-full items-center justify-center font-bold text-xl`}
                >
                  Standard Wish
                </button>
              </div>
              <div className="flex h-full w-1/2 py-2 justify-between items-center">
                <button
                  onClick={() => {
                    setPage("weapon");
                  }}
                  className={`flex flex-row w-1/3 h-full p-1 ${
                    page === "weapon"
                      ? "bg-orange-200 shadow-inner"
                      : "bg-orange-100 shadow-sm"
                  } border-[2px] shadow-black text-black border-orange-400 hover:bg-orange-300 transition-all rounded-full items-center justify-center font-bold text-xl`}
                >
                  Weapon Wish
                </button>
                <div className="flex flex-row w-1/3 h-full px-4 bg-slate-200 border-4 text-xl font-bold border-slate-400 rounded-full items-center shadow-inner shadow-black">
                  Wish Count: {200 - isCurrency / 160}
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full h-full">
              <div className="flex flex-row w-1/2 h-full  border-r-2 border-gray-700">
                <div className="flex flex-col h-full w-1/2 p-2 items-center justify-start">
                  <div className="text-black text-2xl">
                    Last Pulled Character
                  </div>
                  {!isWishing && isCharacter && <img src={isCharacter} />}
                </div>
                <div className="flex flex-col h-full w-1/2 p-2 items-center justify-start">
                  <div className="text-black text-2xl">Last Pulled Weapon</div>
                  {!isWishing && isWeapon && <img src={isWeapon} />}
                </div>
              </div>
              {page === "standard" ? (
                <StandardPage
                  standardWish={standardWish}
                  setWishing={setWishing}
                />
              ) : (
                <WeaponPage weaponWish={weaponWish} setWishing={setWishing} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <img src={logo} className="" />
          <button
            onClick={() => setHome(true)}
            className="bg-orange-200 border-[1px] border-orange-400 px-4 py-2 font-genshin rounded-full shadow-lg shadow-black hover:bg-orange-300 text-black transition-all"
          >
            Start Wishing
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
