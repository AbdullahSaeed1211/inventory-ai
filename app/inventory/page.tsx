"use client";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import InventoryTable from "@/components/Inventory";

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
      <div className="flex items-center justify-center h-screen">
        Please Sign in first...
      </div>
    );
  }
}
