import { useSelector } from "react-redux";
import { TRootState } from "../../Store/BigPie";
import { useEffect, useState } from "react";
import axios from "axios";
import { TCard } from "../../Types/TCard";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaPhoneAlt, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import TitleSection from "./TitleSection";

const Home = () => {
  const [cards, setCards] = useState<TCard[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const cardsPerPage = 10; // Set number of cards per page
  const nav = useNavigate();
  const searchWord = useSelector(
    (state: TRootState) => state.SearchSlice.search,
  );
  const user = useSelector((state: TRootState) => state.UserSlice);

  const searchCards = () => {
    return cards.filter((item: TCard) => item.title.includes(searchWord));
  };

  const isLikedCard = (card: TCard) => {
    if (user && user.user) {
      return card.likes.includes(user.user._id);
    } else return false;
  };

  const navToCard = (id: string) => {
    nav("/card/" + id);
  };

  const navToEdit = (id: string) => {
    nav("/edit-card/" + id);
  };

  const getData = async () => {
    const res = await axios.get(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
    );
    setCards(res.data);
  };

  const likeUnlikeCard = async (card: TCard) => {
    const res = await axios.patch(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/" + card._id,
    );
    if (res.status === 200) {
      toast.success("Card liked/unliked");

      const index = cards.indexOf(card);
      const ifLiked = cards[index].likes.includes(user.user!._id);
      const newCards = [...cards];
      if (ifLiked) {
        newCards[index].likes.splice(index);
      } else {
        newCards[index].likes.push(user.user!._id);
      }

      setCards(newCards);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Get current cards to display based on the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = searchCards().slice(indexOfFirstCard, indexOfLastCard);

  // Handle page navigation
  const nextPage = () => {
    if (currentPage < Math.ceil(searchCards().length / cardsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <TitleSection />
      <main className="flex flex-col items-center justify-center min-h-screen bg-white py-10 dark:bg-black">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 md:px-8">
          {currentCards.map((item: TCard, index) => {
            return (
              <Card
                key={index}
                className="bg-gray-200 text-black shadow-lg rounded-lg dark:bg-gray-600 dark:text-white transition-transform hover:scale-105 duration-300 ease-in-out"
              >
                <img
                  onClick={() => navToCard(item._id)}
                  src={item.image.url}
                  alt={item.image.alt}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h1 className="text-lg font-semibold truncate">
                    {item.title}
                  </h1>
                  <p className="text-sm text-gray-400 mb-2 truncate">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-3 dark:text-white">
                    {item.description}
                  </p>
                  <hr className="my-4 border-gray-700" />
                  <div className="flex flex-col space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Phone:</span>
                      <span className="flex items-center">
                        <FaPhoneAlt className="mr-2" />1234567890
                      </span>{" "}
                      {/* Example phone number */}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Address:</span>
                      <span>123 Example St, City</span>{" "}
                      {/* Example address */}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Card Number:</span>
                      <span>0011223344</span> {/* Example biz number */}
                    </div>
                    <div className="flex items-center justify-center mt-4 space-x-4">
                      {user && user.user && (
                        <>
                          {/* Like/Unlike Heart */}
                          <FaHeart
                            size={20}
                            className="cursor-pointer"
                            color={isLikedCard(item) ? "red" : "black"}
                            onClick={() => likeUnlikeCard(item)}
                          />

                          {/* Edit Button (Visible only for admin users) */}
                          {user.user.isAdmin && (
                            <FaEdit
                              size={20}
                              className="cursor-pointer"
                              onClick={() => navToEdit(item._id)}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-white ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300 dark:hover:bg-gray-500"
            }`}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage >= Math.ceil(searchCards().length / cardsPerPage)}
            className={`px-4 py-2 bg-gray-200 rounded-md dark:bg-gray-600 dark:text-white ${
              currentPage >= Math.ceil(searchCards().length / cardsPerPage)
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300 dark:hover:bg-gray-500"
            }`}
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
};

export default Home;
