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
    <div className="overflow-x-auto bg-black p-6 rounded-lg shadow-lg">
      <Table className="bg-black border border-neutral-700 text-white">
        <TableHeader>
          <TableRow className="bg-neutral-800">
            <TableHead className="text-left">Product</TableHead>
            <TableHead className="text-left">Quantity</TableHead>
            <TableHead className="text-left">Date</TableHead>
            <TableHead className="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map(({ name, quantity, date }) => (
            <TableRow key={name} className="hover:bg-neutral-700">
              <TableCell>{name}</TableCell>
              <TableCell>{quantity}</TableCell>
              <TableCell>
                {date ? format(new Date(date.seconds * 1000), "yyyy-MM-dd") : "N/A"}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => removeItem(name)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  aria-label={`Delete ${name}`}
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryList;
