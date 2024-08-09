"use client";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import InventoryTable from "@/components/Inventory";
import ShoppingList from "@/components/ShoppingList";
import RecipeSuggestions from "@/components/RecipeSuggestions";

const handleSigninPage = () => {
  window.location.href = "/signin";
};

export default function Home() {
  const [user, setUser] = useState<null | {
    displayName: string;
    email: string;
  }>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName!,
          email: currentUser.email!,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="h-screen w-full bg-black bg-dot-white/[0.2] relative">
        <div className="absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="max-w-7xl mx-auto p-6 lg:p-20 flex flex-col items-center justify-center relative z-20">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-4">
              Welcome, {user.displayName}!
            </h1>
            <p className="text-lg sm:text-xl text-neutral-400">
              Here’s your inventory at a glance.
            </p>
          </div>
          <InventoryTable />
          <div className="w-full flex flex-col md:flex-row gap-4 h-[400px]">
            <div className="flex-1 w-full md:w-[60%] h-full">
              <ShoppingList />
            </div>
            <div className="flex-1 w-full md:w-[40%] h-full">
              <RecipeSuggestions />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white relative">
        <div className="absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="text-center relative z-20">
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-7">
            Sign In to View Your Inventory
          </h2>
        </div>
      </div>
    );
  }
}
