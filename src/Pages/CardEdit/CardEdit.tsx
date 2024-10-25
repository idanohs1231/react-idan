import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TCard } from "../../Types/TCard";
import { toast } from "react-toastify";

const CardEdit = () => {
  const [card, setCard] = useState<TCard | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`
      );
      setCard(res.data);
    } catch (error) {
      console.error("Error loading card data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCard((prevCard) => (prevCard ? { ...prevCard, [name]: value } : null));
  };

  const handleSave = async () => {
    if (!card) return;

    const finalSanitizedCard = {
      image: {
        url: card.image.url,
        alt: card.image.alt,
      },
      title: card.title,
      subtitle: card.subtitle,
      description: card.description,
      phone: card.phone,
      email: card.email,
      web: card.web,
      address: {
        houseNumber: card.address.houseNumber,
        street: card.address.street,
        city: card.address.city,
        state: card.address.state,
        country: card.address.country,
        zip: card.address.zip,
      },
    };

    try {
      await axios.put(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
        finalSanitizedCard
      );
      toast.success("Card updated successfully");
      nav(`/card/${id}`);
    } catch (error) {
      console.error("Error saving card", error);
      toast.error("Failed to save the card");
    }
  };

  const handleCancel = () => {
    nav(`/card/${id}`);
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (loading) {
    return <p>Loading card details...</p>;
  }

  if (!card) {
    return <p>Card not found</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ margin: "20px", border: "1px solid #ccc", padding: "10px" }}>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image.url"
            value={card.image.url}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={card.title}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Subtitle:</label>
          <input
            type="text"
            name="subtitle"
            value={card.subtitle}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={card.description}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={card.phone}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={card.email}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Website:</label>
          <input
            type="text"
            name="web"
            value={card.web}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={`${card.address.houseNumber} ${card.address.street}, ${card.address.city}, ${card.address.state}, ${card.address.country}`}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>

        <div>
          <label>Business Number:</label>
          <input
            type="text"
            name="bizNumber"
            value={card.bizNumber}
            onChange={handleChange}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={handleSave} style={{ padding: "10px 20px", cursor: "pointer" }}>
            Save
          </button>
          <button onClick={handleCancel} style={{ padding: "10px 20px", cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardEdit;
