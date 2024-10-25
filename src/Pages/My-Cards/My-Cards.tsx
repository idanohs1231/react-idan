/* eslint-disable tailwindcss/classnames-order */
import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../../Types/TCard";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaPlus, FaSadCry } from "react-icons/fa";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const MyCard = () => {
  const [cards, setCards] = useState<TCard[]>([]);
  const nav = useNavigate();
  const searchWord = useSelector((state: TRootState) => state.SearchSlice.search);
  const user = useSelector((state: TRootState) => state.UserSlice);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
    );
    setCards(res.data);
    AOS.refresh();
  };

  const searchCards = () => {
    const lowerCaseSearch = searchWord.toLowerCase();
    return cards
      .filter((item) => item.user_id === user.user?._id)
      .filter((item) => item.title.toLowerCase().includes(lowerCaseSearch));
  };

  const likeUnlikeCard = async (card: TCard) => {
    const res = await axios.patch(
      `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`
    );
    if (res.status === 200) {
      toast.success("Card liked/unliked");
      const updatedCards = cards.map((c) =>
        c._id === card._id
          ? { ...c, likes: c.likes.includes(user.user!._id) 
              ? c.likes.filter((id) => id !== user.user!._id)
              : [...c.likes, user.user!._id] }
          : c
      );
      setCards(updatedCards);
    }
  };

  const createCard = () => {
    nav("/createcard");
  };

  const handleGoHome = () => {
    nav("/");
  };

  return (
    <div className="flex flex-col items-center justify-start gap-8 p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-green-300" data-aos="fade-up">
        My Cards
      </h1>

      {searchCards().length === 0 ? (
        <div
          data-aos="fade-up"
          className="text-center flex flex-col items-center gap-6 p-8 w-2/5 m-auto 
                     rounded-lg shadow-lg bg-white dark:bg-black dark:ring-2 dark:ring-green-300"
        >
          <FaSadCry size={80} className="text-gray-500 animate-bounce dark:text-green-300" />
          <h2 className="text-3xl font-semibold text-gray-700 dark:text-green-300">
            No Cards Yet!
          </h2>
          <p className="text-lg text-gray-600 dark:text-green-300">
            It seems like you haven't created any cards yet. Start creating one!
          </p>
          <div className="flex flex-row gap-10">
            <button onClick={handleGoHome}>Go Back to Home</button>
            <button onClick={createCard}>Create Card</button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap w-3/5 gap-4 m-auto">
          {searchCards().map((item) => (
            <div key={item._id} data-aos="fade-up" className="w-2/6 m-auto py-6 shadow-lg p-10">
              <img
                onClick={() => nav(`/card/${item._id}`)}
                src={item.image.url}
                alt={item.image.alt}
                className="h-[200px] object-cover cursor-pointer"
                onError={(e) => {
                  e.currentTarget.src = require("../../Media/IDK.png");
                }}
              />
              <h1 className="mt-5 text-center dark:text-green-300 text-xl font-bold">{item.title}</h1>
              <h3 className="mt-5 text-center text-md">{item.subtitle}</h3>
              <p className="mt-5 text-center text-sm">{item.description}</p>
              <hr className="mt-5" />
              <FaHeart
                size={24}
                className="mt-5 m-auto cursor-pointer"
                color={item.likes.includes(user.user!._id) ? "red" : "black"}
                onClick={() => likeUnlikeCard(item)}
              />
            </div>
          ))}
        </div>
      )}

      <div className="fixed bottom-4 right-4 p-3 rounded-full bg-green-500 shadow-lg cursor-pointer hover:scale-110 transition-transform">
        <FaPlus className="text-white" size={24} onClick={createCard} />
      </div>
    </div>
  );
};

export default MyCard;
