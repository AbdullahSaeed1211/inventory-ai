"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { FcGoogle } from "react-icons/fc";

export default function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<null | object>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Add any additional signup logic here (e.g., updating the profile with first and last name)
      router.push("/inventory");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleGoogleSignUp = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/inventory");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleInventory = () => {
    router.push("/inventory");
  };

  if (user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
        <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-7">
          You are already signed in!
        </h2>
        <ShimmerButton
          onClick={handleInventory}
          shimmerColor="#ffffff"
          shimmerSize="0.05em"
          shimmerDuration="3s"
          borderRadius="20px"
          background="rgba(0, 0, 1, 1)"
          className="flex items-center gap-2 px-4 py-2 text-white rounded-md border-blue-800">
          <Link href="/inventory">Go to Your Inventory</Link>
        </ShimmerButton>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black bg-dot-white/[0.2] relative flex flex-col items-center justify-center lg:mt-10 p-[20px] lg:p-20">
      {/* Radial gradient for the background */}
      <div className="absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="flex lg:flex-row flex-col items-center justify-center lg:justify-between gap-10 relative z-20 w-full max-w-7xl">
        <div className="text-white text-center lg:text-left">
          <h2 className="lg:text-7xl text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-4">
            Join Us!
          </h2>
          <p className="text-lg sm:text-xl text-neutral-400">
            Sign up to create an account and manage your inventory efficiently.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="w-full max-w-md">
          <Card className="border border-[#64748b] bg-black shadow-lg hover:shadow-[0_0_20px_0_#0284c7] transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Sign Up</CardTitle>
              <CardDescription className="text-neutral-400">
                Enter your information below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name" className="text-white">
                      First Name
                    </Label>
                    <Input
                      id="first-name"
                      placeholder="Max"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name" className="text-white">
                      Last Name
                    </Label>
                    <Input
                      id="last-name"
                      placeholder="Robinson"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-[#0284c7]">
                  Create an Account
                </Button>
                <Button
                  variant="outline"
                  className="w-full inline-flex gap-x-2"
                  onClick={handleGoogleSignUp}>
                  <FcGoogle size={22} /> Continue with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-neutral-400">
                Already have an account?{" "}
                <Link href="/signin" className="underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
