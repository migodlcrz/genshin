import scene from "./assets/images/scene.jpg";
import primogem from "./assets/images/primogem.png";
import logo from "./assets/images/logo.png";
import { useState } from "react";
import StandardPage from "./components/StandardPage";
import WeaponPage from "./components/WeaponPage";

function App() {
  const [isHome, setHome] = useState<Boolean>(false);
  const [currency, setCurrency] = useState<number>(32000);
  const [page, setPage] = useState<string>("standard");

  return (
    <div
      className="flex items-center justify-center w-screen h-screen bg-cover p-10"
      style={{ backgroundImage: `url(${scene})` }}
    >
      {isHome ? (
        <div className="w-full h-full">
          <div className="flex flex-col w-full h-full items-center justify-start bg-white/50 rounded-3xl p-3">
            <div className="flex flex-row w-full h-20 space-x-4">
              <div className="flex h-full w-1/2 justify-between items-center py-2">
                <div className="flex flex-row w-1/3 h-full p-3 bg-slate-200 border-4 border-slate-400 rounded-full items-center space-x-2 shadow-inner shadow-black">
                  <img src={primogem} className="h-full" />
                  <div className="flex items-center justify-center text-2xl font-bold">
                    {currency}
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
                  Wish Count: 200
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full h-full">
              <div className="flex flex-row w-1/2 h-full  border-r-2 border-gray-700">
                <div className="flex flex-col h-full w-1/2 p-2 items-center justify-start">
                  <div className="text-black text-2xl">
                    Last Pulled Character
                  </div>
                </div>
                <div className="flex flex-col h-full w-1/2 p-2 items-center justify-start">
                  <div className="text-black text-2xl">Last Pulled Weapon</div>
                </div>
              </div>
              {page === "standard" ? <StandardPage /> : <WeaponPage />}
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
