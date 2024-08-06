"use client";
import { useState, useEffect } from "react";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import InventoryList from "@/components/InventoryList";
import { InventoryItem } from "@/types";

// Modal styling
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

const InventoryTable: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1); // Default quantity
  const [date] = useState<string>(new Date().toISOString().split('T')[0]); // Auto-generated current date

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList: InventoryItem[] = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() } as InventoryItem);
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async () => {
    if (!itemName) return;
    if (quantity < 1 || quantity > 10000) {
      alert('Quantity must be between 1 and 10,000');
      return;
    }
    const docRef = doc(collection(firestore, "inventory"), itemName);
    const docSnap = await getDoc(docRef);
    const dateObj = new Date(date);
    if (docSnap.exists()) {
      const { quantity: existingQuantity } = docSnap.data() as { quantity: number };
      await setDoc(docRef, { quantity: Math.min(existingQuantity + quantity, 10000), date: dateObj });
    } else {
      await setDoc(docRef, { quantity: Math.min(quantity, 10000), date: dateObj });
    }
    await updateInventory();
    setItemName("");
    setQuantity(1);
    handleClose();
  };

  const removeItem = async (item: string) => {
    if (!item) return;
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity: existingQuantity } = docSnap.data() as { quantity: number };
      if (existingQuantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: existingQuantity - 1 });
      }
    }
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction="column" spacing={2}>
            <TextField
              id="item-name"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              id="quantity"
              label="Quantity"
              type="number"
              variant="outlined"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(Number(e.target.value), 10000)))}
            />
            <TextField
              id="date"
              label="Date"
              type="date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={date}
              disabled
            />
            <Button
              variant="outlined"
              onClick={addItem}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box
        width="100%"
        maxWidth="800px"
        mx="auto"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2} // Add margin-bottom for spacing
      >
        <Typography variant="h5">Inventory</Typography>
        <Button variant="contained" onClick={handleOpen}>
          Add New Item
        </Button>
      </Box>
      <InventoryList inventory={inventory} removeItem={removeItem} />
    </>
  );
};

export default InventoryTable;
