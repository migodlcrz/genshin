import scene from "./assets/images/scene.jpg";
import primogem from "./assets/images/primogem.png";
import logo from "./assets/images/logo.png";
import { useState } from "react";

function App() {
  const [isHome, setHome] = useState<Boolean>(false);
  const [currency, setCurrency] = useState<number>(32000);

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
                <div className="flex flex-row w-1/3 h-full p-3 bg-slate-200 border-4 border-slate-400 rounded-xl items-center space-x-2 shadow-inner shadow-black">
                  <img src={primogem} className="h-full" />
                  <div className="flex items-center justify-center text-2xl font-bold">
                    {currency}
                  </div>
                </div>
                <div className="flex flex-row w-1/3 h-full p-1 bg-orange-100 border-4 border-orange-300 rounded-xl items-center justify-center font-bold text-xl">
                  Standard Wish
                </div>
              </div>
              <div className="flex h-full w-1/2 py-2 justify-between items-center">
                <div className="flex flex-row w-1/3 h-full p-1 bg-orange-100 border-4 border-orange-300 rounded-xl items-center justify-center font-bold text-xl">
                  Weapon Wish
                </div>
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
