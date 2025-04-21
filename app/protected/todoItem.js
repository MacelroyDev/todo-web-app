"use client"

import { useState } from 'react';

const TodoItem = ({ id, text, completed }) => {
  const [isComplete, setIsComplete] = useState(false);

  const handleToggle = () => {
    setIsComplete(!isComplete);
    // In a real application, you would likely call an API
    // or dispatch an action here to update the server/store
    console.log(`Todo with ID ${id} toggled to ${!isComplete}`);
  };

  return (
    <li>
      <div className="p-4 m-4 w-auto border rounded-lg bg-gray-900 hover:bg-gray-800 flex-col items-center justify-between">
        <div className='flex flex-row items-center justify-between'>
          <p className={`text-lg text-gray-200 font-semibold ${isComplete ? 'line-through text-gray-500' : ''}`}>
            {text}
          </p>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              checked={isComplete}
              onChange={handleToggle}
            />
          </div>
        </div>
        <p className="text-sm text-gray-500">ID: {id}</p>
      </div>
    </li>
  );
};

export default TodoItem;