export interface InventoryItem {
  name: string;
  quantity: number;
  unit?: string;
  imageUrl: string;
  date: { seconds: number };
  price: number;
}


export interface Recipe {
  title: string;
  description: string;
  ingredients: string[];
}

export interface ShoppingItem {
  id: string; 
  itemName: string;
  quantity: number;
  unit: string;
}
