"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrashIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { InventoryItem } from "@/types";

interface InventoryListProps {
  inventory: InventoryItem[];
  removeItem: (name: string) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ inventory, removeItem }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inventory.map(({ name, quantity, date }) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>{quantity}</TableCell>
            <TableCell>
              {date ? format(new Date(date.seconds * 1000), "yyyy-MM-dd") : "N/A"}
            </TableCell>
            <TableCell>
              <button onClick={() => removeItem(name)} className="text-red-500 hover:text-red-700 ">
                <TrashIcon className="w-4 h-4" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InventoryList;
