"use client";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { PersonIcon, ExitIcon } from "@radix-ui/react-icons";
import ShimmerButton from "@/components/magicui/shimmer-button";
import Link from "next/link";

const Navbar = () => {
  const [user, setUser] = useState<null | {
    displayName: string;
    photoURL: string;
  }>(null);
  const router = useRouter();

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
      router.push("/signin"); // Redirect to home after sign-in
    
  };

  return (
    <nav className="relative bg-black bg-dot-white/[0.2] flex items-center justify-between p-4 shadow-md  mx-auto">
      {/* Radial gradient for the navbar */}
      <div className="absolute inset-0 pointer-events-none bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="text-3xl font-bold z-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
        <Link href="/">
          Inventory <span className="text-[#0284c7]">AI</span>
        </Link>
      </div>
      <div className="flex items-center gap-4 z-10">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
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
                <span className="text-lg font-semibold text-white hidden md:block">
                  {user.displayName}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link
                  href="/inventory"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
                  <PersonIcon className="w-4 h-4" />
                  <span>Inventory</span>
                </Link>
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
          <ShimmerButton
            onClick={handleSignIn}
            shimmerColor="#ffffff"
            shimmerSize="0.05em"
            shimmerDuration="3s"
            borderRadius="100px"
            background="rgba(0, 0, 1, 1)"
            className="flex items-center gap-2 px-4 py-2 text-white rounded-md border-blue-800 ">
            <PersonIcon className="w-4 h-4" />
            <span>Sign In</span>
          </ShimmerButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
