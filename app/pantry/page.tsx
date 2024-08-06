"use client";
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import InventoryTable from "@/components/Inventory";

export default function Home() {
  const [user, setUser] = useState<null | { displayName: string; email: string }>(null);
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
    return <Box>Loading...</Box>; 
  }

  if (user) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        gap={2}>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Typography variant="h5">Welcome, {user.displayName}!</Typography>
        </Box>

        <InventoryTable />
      </Box>
    );
  } else {
    return <Box>Please Sign in first...</Box>;
  }
}
