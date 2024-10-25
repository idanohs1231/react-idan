import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TCard } from '../../Types/TCard';
import { cardSchema } from '../../validations/CCardScheme.joi';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { TRootState } from '../../Store/BigPie';

type CreateCardType = Omit<TCard, '_id' | 'likes'>;


const CreateCard: React.FC = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const [formData, setFormData] = useState<CreateCardType>({
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    web: '',
    image: { url: '', alt: '' },
    address: {
      state: '',
      country: '',
      city: '',
      street: '',
      houseNumber: 0,
      zip: 0,
    },
    bizNumber: 0,
    user_id: user?._id || '',
  });

  const [errors, setErrors] = useState<string | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (
    field: keyof CreateCardType['address'],
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const handleImageChange = (field: 'url' | 'alt', value: string) => {
    setFormData((prev) => ({
      ...prev,
      image: { ...prev.image, [field]: value },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = cardSchema.validate(formData, { abortEarly: false });

    if (error) {
      setErrors(error.details.map((detail) => detail.message).join(', '));
      return;
    }

    try {
      await axios.post(
        'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards',
        formData
      );
      toast.success('Card created successfully!');
      nav('/');
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.error('Axios error:', err.response?.data || err.message);
        setErrors(err.response?.data?.message || 'An unexpected error occurred');
      } else {
        console.error('Error:', err.message);
        setErrors(err.message);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto' }}>
        <h1 className='text-2xl font-bold'>Create New Card</h1>
        

        {errors && <div style={{ color: 'red' }}>{errors}</div>}
    <div className='flex flex-col gap-3'>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          placeholder="Subtitle"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="url"
          name="web"
          value={formData.web}
          onChange={handleChange}
          placeholder="Website"
        />
        {['state', 'country', 'city', 'street'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={(formData.address as any)[field]}
            onChange={(e) =>
              handleAddressChange(field as keyof CreateCardType['address'], e.target.value)
            }
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          />
        ))}
        <input
          type="number"
          name="houseNumber"
          value={formData.address.houseNumber}
          onChange={(e) => handleAddressChange('houseNumber', +e.target.value)}
          placeholder="House Number"
        />
        <input
          type="number"
          name="zip"
          value={formData.address.zip}
          onChange={(e) => handleAddressChange('zip', +e.target.value)}
          placeholder="ZIP Code"
        />
        <input
          type="text"
          name="url"
          value={formData.image.url}
          onChange={(e) => handleImageChange('url', e.target.value)}
          placeholder="Image URL"
        />
        <input
          type="text"
          name="alt"
          value={formData.image.alt}
          onChange={(e) => handleImageChange('alt', e.target.value)}
          placeholder="Image Alt Text"
        />
        </div>
        <button type="submit" className='p-3 mt-2 bg-blue-500 hover:bg-blue-700'>Create Card</button>
      </form>
    </div>
  );
};

export default CreateCard;
