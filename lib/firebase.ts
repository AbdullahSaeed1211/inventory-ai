import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, doc, getDocs, setDoc, deleteDoc, query } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

export { auth, firestore, googleProvider, analytics, storage };

// Utility functions

// Add or update an inventory item
export const addItem = async (name: string, quantity: number, category: string, price: number, image?: File) => {
  const itemRef = doc(collection(firestore, 'inventory'), name);

  // If there's an image, upload it and get the URL
  let imageUrl: string | undefined = undefined;
  if (image) {
    const storageRef = ref(storage, `images/${name}`);
    await uploadBytes(storageRef, image);
    imageUrl = await getDownloadURL(storageRef);
    console.log('Uploaded image:', imageUrl);
  }

  await setDoc(itemRef, {
    name,
    quantity,
    category,
    price,
    date: new Date(),
    imageUrl, // Store the image URL if available
  });
};

// Remove an inventory item
export const removeItem = async (name: string) => {
  const itemRef = doc(firestore, 'inventory', name);
  await deleteDoc(itemRef);
};


// Retrieve all inventory items
export const getInventory = async () => {
  const snapshot = query(collection(firestore, 'inventory'));
  const docs = await getDocs(snapshot);
  return docs.docs.map((doc) => ({
    name: doc.id,
    ...(doc.data() as { quantity: number; category: string; price: number; date: { seconds: number }; imageUrl?: string }),
  }));
};
