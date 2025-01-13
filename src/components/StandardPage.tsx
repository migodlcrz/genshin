import { useState } from "react";
import wish from "../assets/gif/wish.gif";

const StandardPage = () => {
  const [showGif, setShowGif] = useState(false);

  const handleWishNow = () => {
    setShowGif(true);
    setTimeout(() => {
      setShowGif(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col w-1/2 h-full items-center p-2">
      <div className="text-2xl">Standard Pull</div>
      <div className="flex flex-col h-full w-full justify-start items-center">
        <div>You Pulled</div>
        {showGif && <img src={wish} alt="Wish GIF" />}
      </div>
      <button
        onClick={handleWishNow}
        className="bg-orange-100 border-[2px] border-orange-400 px-4 py-2 font-genshin rounded-full shadow-lg shadow-black hover:bg-orange-300 text-black transition-all"
      >
        Wish Now
      </button>
    </div>
  );
};

export default StandardPage;
