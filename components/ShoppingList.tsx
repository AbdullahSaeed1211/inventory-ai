"use client";

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
import { firestore } from "@/lib/firebase"; // Ensure you have this import
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth"; // Adjust import path as necessary

const ShoppingList: React.FC = () => {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading } = useAuth(); // Use auth hook to get current user

  const fetchShoppingItems = useCallback(async () => {
    if (!user) return; // Ensure the user is authenticated

    try {
      const q = query(collection(firestore, `shoppingList/${user.uid}`)); // Query scoped to user
      const querySnapshot = await getDocs(q);
      const items: ShoppingItem[] = querySnapshot.docs.map(doc => ({
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

  const handleAddItem = async (item: { itemName: string; quantity: number; unit: string }) => {
    if (!user) return; // Ensure the user is authenticated

    try {
      const newItem: ShoppingItem = {
        id: "", // Firestore will generate an ID
        itemName: item.itemName,
        quantity: item.quantity,
        unit: item.unit,
      };

      // Add new item to Firestore
      const docRef = await addDoc(collection(firestore, `shoppingList/${user.uid}`), newItem);
      setShoppingItems(prevItems => [
        ...prevItems,
        { ...newItem, id: docRef.id }, // Set the ID from Firestore
      ]);
    } catch (error) {
      console.error("Failed to add shopping item:", error);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <Card className="w-full h-full bg-white text-black">
      <CardHeader>
        <CardTitle>Shopping List</CardTitle>
        <CardDescription>Keep track of what you need to buy.</CardDescription>
        <Button
          variant="outline"
          onClick={handleOpenModal}
          className="mt-4 py-2 px-4 bg-white text-blue-600 rounded">
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
            <div key={item.id} className="mb-4">
              <h3 className="text-lg font-semibold">{item.itemName}</h3>
              <p className="text-sm text-gray-700">Quantity: {item.quantity} {item.unit}</p>
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
