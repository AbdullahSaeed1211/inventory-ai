import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import ShoppingListModal from "@/components/ShoppingListModal";
import { Button } from "./ui/button";
import { ShoppingItem } from "@/types";
import { firestore } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { Trash2 } from "lucide-react";

const ShoppingList: React.FC = () => {
  const { user, loading } = useAuth();
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchShoppingItems = useCallback(async () => {
    if (!user) return;

    try {
      const snapshot = await getDocs(collection(firestore, `shoppingList/${user.uid}/items`));
      const items: ShoppingItem[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<ShoppingItem, "id">,
      }));
      setShoppingItems(items);
    } catch (error) {
      console.error("Failed to fetch shopping items:", error);
    }
  }, [user]);

  useEffect(() => {
    if (!loading) {
      fetchShoppingItems();
    }
  }, [loading, fetchShoppingItems]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddItem = async (item: {
    itemName: string;
    quantity: number;
    unit: string;
  }) => {
    if (!user) return;

    try {
      const newItem: ShoppingItem = {
        id: "",
        itemName: item.itemName,
        quantity: item.quantity,
        unit: item.unit,
      };

      const docRef = await addDoc(collection(firestore, `shoppingList/${user.uid}/items`), newItem);
      setShoppingItems((prevItems) => [
        ...prevItems,
        { ...newItem, id: docRef.id },
      ]);
    } catch (error) {
      console.error("Failed to add shopping item:", error);
    } finally {
      handleCloseModal();
    }
  };

  // const handleDeleteItem = async (itemId: string) => {
  //   if (!user) return;

  //   try {
  //     await deleteDoc(doc(firestore, `shoppingList/${user.uid}/items`, itemId));
  //     setShoppingItems((prevItems) =>
  //       prevItems.filter((item) => item.id !== itemId)
  //     );
  //   } catch (error) {
  //     console.error("Failed to delete shopping item:", error);
  //   }
  // };

  if (loading) return <p>Loading...</p>;

  return (
    <Card className="w-full h-full bg-white text-black">
      <CardHeader>
        <CardTitle>Shopping List</CardTitle>
        <CardDescription>Keep track of what you need to buy.</CardDescription>
        <Button
          variant="outline"
          onClick={handleOpenModal}
          className="mt-4 py-2 px-4 bg-white text-blue-600 rounded"
        >
          Add New Item
        </Button>
      </CardHeader>
      <CardContent>
        {shoppingItems.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-lg font-semibold">Your shopping list is empty</p>
            <p>Add items to get started.</p>
          </div>
        ) : (
          shoppingItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">{item.itemName}</h3>
                <p className="text-sm text-gray-700">
                  Quantity: {item.quantity} {item.unit}
                </p>
              </div>
              {/* <Button
                variant="ghost"
                className="text-red-500"
                onClick={() => handleDeleteItem(item.id)}
              >
                <Trash2 />
              </Button> */}
            </div>
          ))
        )}
      </CardContent>
      <ShoppingListModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddItem={handleAddItem}
      />
    </Card>
  );
};

export default ShoppingList;
