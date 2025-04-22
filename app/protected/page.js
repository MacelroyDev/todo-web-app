"use client"
import Link from 'next/link';
import TodoItem from './todoItem';
import TodoList from './list';
import sampleData from './sample.json'
import { useUserAuth } from "../_utils/auth-context";
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
import AddNewItem from './addItem'
import { getItems, addItem, deleteItem } from '../_services/todo-list-service';

// Main todo page

export default function Home() {

  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const [todos, setTodos] = useState([]);


  // Load items function
  async function loadItems() {
    try {
        const userItems = await getItems(user.uid);
        setTodos(userItems);
    } catch (error) {
        console.error("Error loading items:", error);
    }
  }

  // Load items when user is true
  useEffect(() => {
    if (user) {
        loadItems();
    }
  }, [user]);

  // Handle Item Addition
  const handleAddItemToList = async (newItemText) => {
    if (user && user.uid) {
      try {

        let itemToAdd = {
          "text": newItemText,
          "isComplete": false
        }
          
          itemToAdd.id = await addItem(user.uid,newItemText);

          setTodos(prevItems => [...prevItems, itemToAdd]);

      } catch (error) {
          console.error("Error adding item:", error)
      }
    } else {
        console.log("User not logged in, cannot add item.");
    }
  }

  // Handle Item Deletion
  const handleDeleteItem = async (idToDelete) => {
    if (user && user.uid) {
      const success = await deleteItem(user.uid, idToDelete);
      if (success) {
        setTodos(todos.filter(todo => todo.id !== idToDelete));
      } else {
        // Optionally handle the error (e.g., display a message)
        console.error("Failed to delete item.");
      }
    }
  }



  // check if user is not null
  if (user != null){

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">To Do List Main Page</h1>
        <AddNewItem onAddItem={handleAddItemToList}/>
        <TodoList items={todos} onDeleteItem={handleDeleteItem}/>
      </div>
    );

  } else {
    redirect('/')
  }
}