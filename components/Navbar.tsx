"use client";
import { useState, useEffect } from "react";
import { signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Adjust the import path as needed
import { PersonIcon, ExitIcon } from "@radix-ui/react-icons";

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
    <nav className="bg-blue-700 text-white p-4 flex items-center justify-between shadow-md">
      <div className="text-3xl font-bold">Pantry-AI</div>
      <div className="flex items-center gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger >
              <div className="flex items-center gap-3 cursor-pointer">
                {user.photoURL && (
                  <Image
                    src={user.photoURL}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full border border-gray-300"
                  />
                )}
                <span className="text-lg font-semibold">{user.displayName}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <a href="/profile" className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                  <PersonIcon className="w-4 h-4" />
                  <span>Profile</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <div className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                  <ExitIcon className="w-4 h-4" />
                  <span className="text-red-600">Sign Out</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            onClick={handleSignIn}
            className="flex items-center gap-2 px-3 py-2 bg-white text-black hover:bg-gray-100 rounded-md transition duration-150 ease-in-out"
          >
            <PersonIcon className="w-4 h-4" />
            <span>Sign In</span>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
