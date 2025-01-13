import { useState } from "react";
import wish from "../assets/gif/wish.gif";
import { StandardPageProps } from "../types";
import { isCharacterItem, isWeaponItem } from "../functions";

const StandardPage: React.FC<StandardPageProps> = ({
  standardWish,
  setWishing,
}) => {
  const [showGif, setShowGif] = useState(false);
  const [isPull, setPull] = useState<string>();
  const [isItemLink, setItemLink] = useState<string>();

  const handleWishNow = () => {
    setWishing(true);
    setShowGif(true);
    setPull("");
    setItemLink("");
    const pull = standardWish();
    if (isCharacterItem(pull)) {
      setItemLink(`https://genshin.jmp.blue/characters/${pull.id}/icon`);
    } else if (isWeaponItem(pull)) {
      setItemLink(`https://genshin.jmp.blue/weapons/${pull.id}/icon`);
    }
    setTimeout(() => {
      setShowGif(false);
      if (pull) setPull(pull.name);
      setWishing(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col w-1/2 h-full items-center p-2">
      <div className="text-2xl">Standard Pull</div>
      <div className="flex flex-col h-full w-full justify-start items-center">
        {isPull && <div>You Pulled {isPull}</div>}
        {isPull && <img src={isItemLink} />}
        {showGif && <img src={wish} alt="Wish GIF" />}
      </div>
      <button
        onClick={handleWishNow}
        className="bg-orange-100 border-[2px] border-orange-400 px-4 py-2 font-genshin rounded-full shadow-lg shadow-black hover:bg-orange-300 text-black transition-all"
        disabled={showGif}
      >
        Wish Now
      </button>
    </div>
  );
};

export default StandardPage;
