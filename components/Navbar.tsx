"use client";
import { useState, useEffect } from "react";
import { signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [user, setUser] = useState<null | { displayName: string; photoURL: string }>(null);
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider(); // Initialize Google Auth Provider

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName || "User",
          photoURL: currentUser.photoURL || "/default-avatar.png",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect to home after sign-out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/"); // Redirect to home after sign-in
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex items-center justify-between">
      <div className="text-2xl font-bold">Pantry-AI</div>
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-2">
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <span>{user.displayName}</span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition duration-150 ease-in-out">
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
