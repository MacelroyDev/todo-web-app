"use client"

import { useState } from 'react';

const AddNewItem = ({ onAddItem }) => {
  const [newItemText, setNewItemText] = useState('');

  const handleInputChange = (event) => {
    setNewItemText(event.target.value);
  };

  const handleAddItem = () => {
    if (newItemText.trim()) {
      onAddItem(newItemText);
      setNewItemText(''); // Clear the input
    }
  };


  return (
    <div className="p-4 mb-4 border rounded-lg bg-gray-800">
      <div className="flex items-center">
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
          placeholder="Add new item..."
          value={newItemText}
          onChange={handleInputChange}
        />
        <button
          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleAddItem}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddNewItem