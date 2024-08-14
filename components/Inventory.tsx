import { useState, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
  writeBatch
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import InventoryList from "@/components/InventoryList";
import { InventoryItem } from "@/types";
import { Button } from "@/components/ui/button";
import InventoryModal from "@/components/InventoryModal";
import { useAuth } from "@/hooks/useAuth";

const InventoryTable: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();

  const updateInventory = useCallback(async () => {
    if (!user) return;

    try {
      const snapshot = query(
        collection(firestore, `inventory/${user.uid}/items`)
      );
      const docs = await getDocs(snapshot);
      const inventoryList: InventoryItem[] = [];
      docs.forEach((doc) => {
        inventoryList.push({ name: doc.id, ...doc.data() } as InventoryItem);
      });
      setInventory(inventoryList);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    }
  }, [user]);

  useEffect(() => {
    if (!loading) {
      updateInventory();
    }
  }, [user, loading, updateInventory]);

  const addItem = async (item: {
    itemName: string;
    quantity: number;
    price: number;
    date: string;
    imageUrl?: string;
    unit?: string;
  }) => {
    if (!user) return;

    const { itemName, quantity, unit, price, date, imageUrl } = item;
    if (!itemName) return;
    if (quantity < 1 || quantity > 10000) {
      alert("Quantity must be between 1 and 10,000");
      return;
    }

    const docRef = doc(firestore, `inventory/${user.uid}/items`, itemName);
    const docSnap = await getDoc(docRef);
    const dateObj = new Date(date);
    if (docSnap.exists()) {
      const { quantity: existingQuantity } = docSnap.data() as {
        quantity: number;
      };
      await setDoc(
        docRef,
        {
          quantity: Math.min(existingQuantity + quantity, 10000),
          price,
          date: dateObj,
          imageUrl,
          unit,
        },
        { merge: true }
      );
    } else {
      await setDoc(docRef, {
        quantity: Math.min(quantity, 10000),
        price,
        date: dateObj,
        imageUrl,
        unit,
      });
    }
    await updateInventory();
    handleClose();
  };

  const removeItem = async (item: string) => {
    if (!user) return;
    try {
      const docRef = doc(firestore, `inventory/${user.uid}/items`, item);
      await deleteDoc(docRef);
      await updateInventory();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const incrementQuantity = async (item: string) => {
    if (!user || !item) return;
    try {
      const docRef = doc(firestore, `inventory/${user.uid}/items`, item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity: existingQuantity } = docSnap.data() as {
          quantity: number;
        };
        await setDoc(
          docRef,
          { quantity: Math.min(existingQuantity + 1, 10000) },
          { merge: true }
        );
        await updateInventory();
      }
    } catch (error) {
      console.error("Failed to increment quantity:", error);
    }
  };

  const decrementQuantity = async (name: string) => {
    if (!user || !name) return;
    try {
      const docRef = doc(firestore, `inventory/${user.uid}/items`, name);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { quantity: existingQuantity } = docSnap.data() as {
          quantity: number;
        };
        if (existingQuantity > 1) {
          await setDoc(docRef, { quantity: existingQuantity - 1 }, { merge: true });
        } else {
          await removeItem(name);
        }
        await updateInventory();
      }
    } catch (error) {
      console.error("Failed to decrement quantity:", error);
    }
  };

  const deleteAll = async () => {
    if (!user) return;
    try {
      const snapshot = query(collection(firestore, `inventory/${user.uid}/items`));
      const docs = await getDocs(snapshot);
      const batch = writeBatch(firestore);

      docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      await updateInventory();
    } catch (error) {
      console.error("Failed to delete all items:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="w-full">
      <InventoryModal
        isOpen={open}
        onClose={handleClose}
        onAddItem={addItem}
      />
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb={2}
      >
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h5">Inventory</Typography>
          <Button variant="default" onClick={handleOpen}>
            Add New Item
          </Button>
        </Box>
        <Box width="100%">
          <InventoryList
            inventory={inventory}
            removeItem={removeItem}
            incrementQuantity={incrementQuantity}
            deleteAll={deleteAll}
            decrementQuantity={decrementQuantity}
          />
        </Box>
      </Box>
    </div>
  );
};

export default InventoryTable;
