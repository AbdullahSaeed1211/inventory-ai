import Image from "next/image";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { InventoryItem } from "@/types";

interface InventoryListProps {
  inventory: InventoryItem[];
  removeItem: (name: string) => void;
  incrementQuantity: (name: string) => void;
  deleteAll: () => void;
}

const InventoryList: React.FC<InventoryListProps> = ({
  inventory,
  removeItem,
  incrementQuantity,
  deleteAll,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory</CardTitle>
        <CardDescription>
          Manage your inventory and view details for each item.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Increment</TableHead>
              <TableHead>Delete All</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map(({ name, quantity, price, date, imageUrl }) => (
              <TableRow key={name}>
                <TableCell className="hidden sm:table-cell">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      width="64"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </TableCell>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>${(price ?? 0).toFixed(2)}</TableCell>{" "}
                {/* Price column */}
                <TableCell className="hidden md:table-cell">
                  {date
                    ? format(new Date(date.seconds * 1000), "yyyy-MM-dd")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Button
                    aria-label="Decrement quantity"
                    variant="ghost"
                    onClick={() => removeItem(name)}
                    className="text-red-500">
                    <span>▼</span> {/* Decrement button */}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    aria-label="Increment quantity"
                    variant="ghost"
                    onClick={() => incrementQuantity(name)}>
                    <span className="text-green-500">▲</span>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    aria-label="Delete all"
                    variant="ghost"
                    onClick={deleteAll}
                    className="text-red-500">
                    Delete All
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{inventory.length}</strong> items
        </div>
      </CardFooter>
    </Card>
  );
};

export default InventoryList;
