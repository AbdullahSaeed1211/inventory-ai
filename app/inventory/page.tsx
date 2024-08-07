"use client";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";

import { onAuthStateChanged } from "firebase/auth";
import InventoryTable from "@/components/Inventory";
import ShimmerButton from "@/components/magicui/shimmer-button";

const handleSigninPage = () => {
  window.location.href = "/signin";}

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
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (user) {
    return (
      <div className="max-w-7xl mx-auto sm:p-4 p-20">
        <div className="flex flex-col items-center justify-start  p-2">
          <InventoryTable />
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center bg-black text-white">
        <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-7">
          Sign In to View Your Inventory
        </h2>
       
      </div>
    );
  }
}
