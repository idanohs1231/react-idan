import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TCard } from "../../Types/TCard";

const CardDetails = () => {
  const [card, setCard] = useState<TCard>();
  const { id } = useParams<{ id: string }>();

  const getData = async () => {
    const res = await axios.get(
      `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`
    );
    setCard(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {card ? (
        <div style={{ border: "1px solid #ccc", padding: "10px" }}>
          <img 
            src={card.image.url} 
            alt={card.image.alt} 
            style={{ width: "100%", height: "200px", objectFit: "cover" }} 
          />

          <h1>{card.title}</h1>
          <h2>{card.subtitle}</h2>
          <p>{card.description}</p>

          <hr />

          <div>
            <p>
              <strong>Phone:</strong> {card.phone}
            </p>
            <p>
              <strong>Email:</strong> 
              <a href={`mailto:${card.email}`}>{card.email}</a>
            </p>
            <p>
              <strong>Website:</strong> 
              <a href={card.web} target="_blank" rel="noopener noreferrer">
                {card.web}
              </a>
            </p>
            <p>
              <strong>Address:</strong> 
              {`${card.address.houseNumber} ${card.address.street}, ${card.address.city}, ${card.address.state}, ${card.address.country}`}
            </p>
            <p>
              <strong>Business Number:</strong> {card.bizNumber}
            </p>
            <p>
              <strong>Likes:</strong> {card.likes.length}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading card details...</p>
      )}
    </div>
  );
};

export default CardDetails;
