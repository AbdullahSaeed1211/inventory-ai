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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Sign In to Pantry Tracker
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Access and manage your pantry items with ease. Sign in to get started.
      </p>
      <button
        onClick={handleGoogleSignIn}
        className="px-6 py-3 bg-blue-600 text-white text-xl rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default SignInScreen;
