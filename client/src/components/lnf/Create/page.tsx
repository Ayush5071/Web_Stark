import { useState } from 'react';
import { useLnf } from '@/context/LnfContext';
import React from 'react';

export default function CreatePage() {
  const { createLostAndFoundItem } = useLnf();
  const [form, setForm] = useState({ itemName: '', description: '', location: '' });

  const handleChange = (e: { target: { name: any; value: any; }; }) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    //console.log("Form data:", form);
    try {
      const response = await createLostAndFoundItem(form);
      alert(response.message);
    } catch (error) {
      console.error(error);
      alert('Error creating item');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Create Lost Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Item Name</label>
            <input
              name="itemName"
              placeholder="Enter item name"
              value={form.itemName}
              onChange={handleChange}
              required
              className="w-full px-4 bg-white py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full bg-white px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Location</label>
            <input
              name="location"
              placeholder="Enter location"
              value={form.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
