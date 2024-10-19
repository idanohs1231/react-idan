import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TCard } from "../../Types/TCard";  // Keep the original TCard type
import { cardSchema } from '../../validations/CCardScheme.joi';  // Adjust the path

// Omit _id and likes from TCard for this component's form state
type CreateCardType = Omit<TCard, '_id' | 'likes'>;

const CreateCard: React.FC = () => {
  const [formData, setFormData] = useState<CreateCardType>({
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    web: '',
    image: {
      url: '',
      alt: ''
    },
    address: {
      state: '',
      country: '',
      city: '',
      street: '',
      houseNumber: 0,
      zip: 0
    },
    bizNumber: 0,
    user_id: ''
  });

  const [errors, setErrors] = useState<string | null>(null);

  // Set the token as default header
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      console.warn('No token found in localStorage');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = cardSchema.validate(formData, { abortEarly: false });
  
    if (error) {
      setErrors(error.details.map(detail => detail.message).join(', '));
      return;
    }
  
    try {
      const response = await axios.post('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards', formData);
      console.log('Response:', response.data);
      setErrors(null);
      // Proceed with your response handling
    } catch (err) {
      // General error handling, assuming err could be any type
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      console.error('Error:', message);
      setErrors(message);
    }
  };
  return (
    <div className="max-w-4xl p-5 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-center">Create Card</h2>
      {errors && <div className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded" role="alert">{errors}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required
                 className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtitle</label>
          <input type="text" name="subtitle" id="subtitle" value={formData.subtitle} onChange={handleChange} required
                 className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} required
                    className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange} required
                 className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required
                 className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="web" className="block text-sm font-medium text-gray-700">Website</label>
          <input type="url" name="web" id="web" value={formData.web} onChange={handleChange}
                 className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="image-url" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="url" name="image-url" id="image-url" value={formData.image.url} onChange={(e) => setFormData({...formData, image: {...formData.image, url: e.target.value}})}
                   className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="image-alt" className="block text-sm font-medium text-gray-700">Image Alt Text</label>
            <input type="text" name="image-alt" id="image-alt" value={formData.image.alt} onChange={(e) => setFormData({...formData, image: {...formData.image, alt: e.target.value}})}
                   className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input type="text" name="country" id="country" value={formData.address.country} onChange={(e) => setFormData({...formData, address: {...formData.address, country: e.target.value}})} required
                   className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input type="text" name="city" id="city" value={formData.address.city} onChange={(e) => setFormData({...formData, address: {...formData.address, city: e.target.value}})} required
                   className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
        </div>
        <div>
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
          <input type="text" name="street" id="street" value={formData.address.street} onChange={(e) => setFormData({...formData, address: {...formData.address, street: e.target.value}})} required
                 className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        <div>
          <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700">House Number</label>
          <input type="number" name="houseNumber" id="houseNumber" value={formData.address.houseNumber} onChange={(e) => setFormData({...formData, address: {...formData.address, houseNumber: Number(e.target.value)}})} required
                 className="block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>
        
        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-pink-300 bg-gradient-to-r from-red-600 to-blue-500 dark:bg-gradient-to-r from-green-300 to-blue-500-600 rounded hover:bg-indigo-700 focus:outline-none focus:shadow-outline">
          Create Card
        </button>
      </form>
    </div>
  );
};  
export default CreateCard;
