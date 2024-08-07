export interface InventoryItem {
  name: string;
  quantity: number;
  imageUrl?: string;
  date: { seconds: number };
  price: number; // Ensure price is included
}