export interface InventoryItem {
  name: string;
  quantity: number;
  unit?: string;
  imageUrl: string;
  date: { seconds: number };
  price: number;
}
