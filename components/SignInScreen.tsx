// components/SignInScreen.tsx
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const SignInScreen = () => {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800 mb-8">
        Sign In to Pantry Tracker
      </h1>
      <Button
        variant="contained"
        onClick={handleGoogleSignIn}
        className="px-6 py-3 bg-blue-600 text-white text-xl rounded-md hover:bg-blue-700"
      >
        Sign In with Google
      </Button>
    </div>
  );
};

export default SignInScreen;
