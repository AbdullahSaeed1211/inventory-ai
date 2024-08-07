"use client";

import React, { useState, useRef, useCallback } from "react";
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
import Webcam from "react-webcam";
import Image from "next/image";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (params: {
    itemName: string;
    quantity: number;
    price: number;
    date: string;
    imageUrl?: string; // Ensure this matches the URL type
  }) => void;
}

const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose,
  onAddItem,
}) => {
  const [itemName, setItemName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [date] = useState<string>(new Date().toISOString().split("T")[0]);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [useCamera, setUseCamera] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [confirmCapture, setConfirmCapture] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const webcamRef = useRef<Webcam>(null);

  const handleAdd = async () => {
    let uploadImageUrl: string | undefined = imageUrl;

    if (image) {
      // Upload image to Firebase
      const storage = getStorage();
      const storageRef = ref(storage, `images/${image.name}`);
      try {
        console.log('Uploading image...');
        await uploadBytes(storageRef, image);
        uploadImageUrl = await getDownloadURL(storageRef);
        console.log('Uploaded image URL:', uploadImageUrl);
      } catch (error) {
        console.error('Image upload failed', error);
      }
    }

    // Pass the image URL as a string
    onAddItem({ itemName, quantity, price, date, imageUrl: uploadImageUrl });

    // Reset states
    setItemName("");
    setQuantity(1);
    setPrice(0);
    setImage(undefined);
    setImagePreview(null);
    setImageUrl("");
    setUseCamera(false);
    setConfirmCapture(false);
    onClose();
  };

  const handleImageUpload = async (files: FileList | null) => { // Make the function async
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) {
        // 5MB limit
        setImage(file);

        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setImagePreview(event.target.result as string); // Update preview URL
          }
        };
        reader.readAsDataURL(file); // Read the image for preview

        // Upload image to Firebase
        const storage = getStorage();
        const storageRef = ref(storage, `images/${file.name}`);
        try {
          console.log('Uploading image...');
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          console.log('Uploaded image URL:', url);
          setImageUrl(url); // Update imageUrl state with the uploaded URL
        } catch (error) {
          console.error('Image upload failed', error);
        }
      } else {
        alert("Please select a valid image file (less than 5MB).");
      }
    }
  };

  const handleCapture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const blob = dataURItoBlob(imageSrc);
      const file = new File([blob], "captured_photo.jpg", {
        type: "image/jpeg",
      });

      // Initialize Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `images/${file.name}`);

      try {
        console.log("Uploading image...");
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        console.log("Uploaded image URL:", url);
        setImagePreview(url); // Update preview
        setImage(file); // Set image state
        setConfirmCapture(true);
        setImageUrl(url); // Update imageUrl state with the uploaded URL
        setUseCamera(false);
      } catch (error) {
        console.error("Image upload failed", error);
      }
    }
  }, [webcamRef]);

  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/50" />
      <DialogContent className="fixed left-1/2 top-1/2 z-50 max-w-3xl w-full p-6 bg-[#18181a] rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2">
        <DialogHeader>
          <DialogTitle className="text-white">Add Item</DialogTitle>
          <DialogClose className="absolute top-4 right-4 p-1 text-gray-500 hover:text-white">
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="item-name" className="text-gray-400">
                Item
              </Label>
              <Input
                id="item-name"
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="mt-1 bg-gray-700 text-white placeholder-gray-500"
              />
            </div>
            <div>
              <Label htmlFor="quantity" className="text-gray-400">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(1, Math.min(Number(e.target.value), 10000))
                  )
                }
                className="mt-1 bg-gray-700 text-white placeholder-gray-500"
              />
            </div>
            <div>
              <Label htmlFor="price" className="text-gray-400">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="mt-1 bg-gray-700 text-white placeholder-gray-500"
              />
            </div>
            <div>
              <Label htmlFor="date" className="text-gray-400">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                disabled
                className="mt-1 bg-gray-700 text-white placeholder-gray-500"
              />
            </div>
            <div>
              <Label htmlFor="image" className="text-gray-400">
                Upload Image
              </Label>
              <Input
                id="image"
                type="file"
                accept="image/*" // Ensure only image files can be selected
                onChange={(e) => handleImageUpload(e.target.files)}
                className="mt-1 bg-gray-700 text-white"
              />
            </div>
            <div className="mt-4 flex space-x-2">
              {!image && (
                <Button
                  type="button"
                  onClick={() => setUseCamera(true)}
                  className="bg-green-500 hover:bg-green-600 text-white">
                  Take Photo
                </Button>
              )}
              {useCamera && (
                <Button
                  type="button"
                  onClick={() => setUseCamera(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white">
                  Cancel
                </Button>
              )}
            </div>
          </div>

          {useCamera && !confirmCapture && (
            <div className="mt-4 md:mt-0">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={480}
                videoConstraints={{ facingMode: "user" }}
              />
              <div className="mt-2 flex justify-between">
                <Button
                  type="button"
                  onClick={handleCapture}
                  className="bg-green-500 hover:bg-green-600 text-white">
                  Capture
                </Button>
              </div>
            </div>
          )}

          {confirmCapture && (
            <div className="mt-4 md:mt-0 flex flex-col items-center">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-auto max-w-xs"
                  width={200}
                  height={200}
                />
              ) : (
                <div className="w-full h-auto max-w-xs bg-gray-800 flex items-center justify-center">
                  No Preview Available
                </div>
              )}
              <div className="mt-4 flex space-x-2">
                <Button
                  type="button"
                  onClick={() => setConfirmCapture(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white">
                  Retake
                </Button>
                <Button
                  type="button"
                  onClick={handleAdd}
                  className="bg-blue-500 hover:bg-blue-600 text-white">
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={itemName === "" || quantity <= 0 || price < 0}>
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

export default InventoryModal;
