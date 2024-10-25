import { useSelector } from 'react-redux';
import { TRootState } from '../../Store/BigPie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TCard } from '../../Types/TCard';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import TitleSection from './TitleSection';

const Home = () => {
  const [cards, setCards] = useState<TCard[]>([]);
  const nav = useNavigate();
  const searchWord = useSelector((state: TRootState) => state.SearchSlice.search);
  const user = useSelector((state: TRootState) => state.UserSlice);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards');
    setCards(res.data);
  };

  const searchCards = () =>
    cards.filter((item) => item.title.toLowerCase().includes(searchWord.toLowerCase()));

  const toggleLike = async (card: TCard) => {
    try {
      const res = await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${card._id}`
      );

      if (res.status === 200) {
        const updatedCard = res.data;
        setCards(cards.map((c) => (c._id === updatedCard._id ? updatedCard : c)));
        toast.success('Card liked/unliked successfully');
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to toggle like');
    }
  };

  return (
    <>
      <TitleSection />
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
          {searchCards().map((card, index) => (
            <div
              key={index}
              style={{ border: '1px solid #ccc', padding: '10px', width: 'calc(25% - 10px)' }}
            >
              <img
                src={card.image.url}
                alt={card.image.alt}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                onClick={() => nav(`/card/${card._id}`)}
                onError={(e) => {
                  e.currentTarget.src = require('../../Media/IDK.png');
                }}
              />
              <h1>{card.title}</h1>
              <p>{card.subtitle}</p>
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                {user?.user && (
                  <>
                    <FaHeart
                      size={20}
                      style={{ cursor: 'pointer', color: card.likes.includes(user.user._id) ? 'red' : 'black' }}
                      onClick={() => toggleLike(card)}
                    />
                    {user.user.isAdmin && (
                      <FaEdit
                        size={20}
                        style={{ cursor: 'pointer' }}
                        onClick={() => nav(`/edit-card/${card._id}`)}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
