"use client"

import { useState } from 'react';
import { FaTrash } from "react-icons/fa";
import { updateItemCompletion } from '../_services/todo-list-service'; // Import the new function
import { useUserAuth } from '../_utils/auth-context'; // Assuming you have user auth context


const TodoItem = ({ id, text, completed, onDeleteItem }) => {
  const [isComplete, setIsComplete] = useState(completed);
  const { user } = useUserAuth();

  const handleToggle = async () => {
    const newIsComplete = !isComplete;
    setIsComplete(newIsComplete);

    if (user?.uid) {
      const success = await updateItemCompletion(user.uid, id, newIsComplete);
      if (!success) {
        // If the update fails, revert the local state
        setIsComplete(!newIsComplete);
        console.error("Failed to update item completion in Firestore.");
      }
    } else {
      console.log("User not logged in, cannot update item completion.");
    }
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
        <button onClick={() => onDeleteItem(id)} className="text-gray-500 hover:text-red-500 focus:outline-none">
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;