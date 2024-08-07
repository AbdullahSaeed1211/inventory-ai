"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import ShoppingListModal from "@/components/ShoppingListModal";
import { Button } from "./ui/button";

const ShoppingList: React.FC = () => {
  const [shoppingItems, setShoppingItems] = useState([
    { id: 1, name: "Eggs", quantity: "12" },
    { id: 2, name: "Milk", quantity: "1 liter" },
    { id: 3, name: "Bread", quantity: "2 loaves" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddItem = (item: { itemName: string; quantity: number }) => {
    setShoppingItems([
      ...shoppingItems,
      {
        id: shoppingItems.length + 1,
        name: item.itemName,
        quantity: `${item.quantity}`,
      },
    ]);
  };

  return (
    <Card className="w-full bg-white text-black">
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
        {shoppingItems.map((item) => (
          <div key={item.id} className="mb-4">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-700">Quantity: {item.quantity}</p>
          </div>
        ))}
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
