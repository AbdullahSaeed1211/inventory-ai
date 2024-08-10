"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ShoppingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: { itemName: string; quantity: number; unit: string }) => void;
}

const ShoppingListModal: React.FC<ShoppingListModalProps> = ({
  isOpen,
  onClose,
  onAddItem,
}) => {
  const [itemName, setItemName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [unit, setUnit] = useState<string>("pcs");

  const handleAdd = () => {
    if (itemName.trim() === "" || quantity <= 0) {
      return; // Optionally show an error message
    }

    onAddItem({ itemName, quantity, unit });
    setItemName("");
    setQuantity(1);
    setUnit("pcs");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/50" />
      <DialogContent className="fixed left-1/2 top-1/2 z-50 w-full max-w-md p-6 bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2">
        <DialogHeader>
          <DialogTitle className="text-gray-800">Add Item</DialogTitle>
          <DialogClose className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="item-name" className="text-gray-800">Item</Label>
            <Input
              id="item-name"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="bg-gray-100 text-gray-800"
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Label htmlFor="quantity" className="text-gray-800">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="bg-gray-100 text-gray-800"
              />
            </div>
            <div className="w-1/5">
              <Label htmlFor="unit" className="text-gray-800">Unit</Label>
              <select
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="bg-gray-100 text-gray-800 w-full h-full"
              >
                <option value="pcs">pieces (pcs)</option>
                <option value="kg">kilograms (kg)</option>
                <option value="L">liters (L)</option>
                <option value="g">grams (g)</option>
              </select>
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between mt-6">
          <Button
            onClick={handleAdd}
            disabled={itemName.trim() === "" || quantity <= 0}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Add
          </Button>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingListModal;
