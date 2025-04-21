"use client"
import Link from 'next/link';
import TodoItem from './todoItem';
import TodoList from './list';
import sampleData from './sample.json'
import { useUserAuth } from "../_utils/auth-context";
import { redirect } from 'next/navigation';

// Main todo page

export default function Home() {

  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();


  // check if user is not null
  if (user != null){

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">To Do List Main Page</h1>
        <TodoList items={sampleData}/>
      </div>
    );

  } else {
    redirect('/')
  }
}