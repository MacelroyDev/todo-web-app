"use client"
import { useUserAuth } from "./_utils/auth-context";
import Link from 'next/link';

// Main login page

export default function Home() {


  // Use the useUserAuth hook to get the user object and the login and logout functions
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  
  // Create async function for async calls
  const signInAndOut = async () => {
    if(user === null){
      await gitHubSignIn();
    }
    if(user){
      await firebaseSignOut();
    }
  };


  if (user){
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome back, {user.displayName}</h1>
        <Link href={{ pathname: '/protected' }} className="px-4 py-2 m-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          Enter
        </Link>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-75" onClick={signInAndOut}>Logout</button>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, please login.</h1>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" onClick={signInAndOut}>Login</button>
      </div>
    );
  }
}