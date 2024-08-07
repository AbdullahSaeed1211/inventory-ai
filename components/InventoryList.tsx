import Image from "next/image";
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
        <div className="overflow-x-auto">
          <Table className="hidden md:table">
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Image</TableHead>
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
                  <TableCell>
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
                  <TableCell>${(price ?? 0).toFixed(2)}</TableCell>
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
                      <span>▼</span>
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
          <div className="md:hidden">
            {inventory.map(({ name, quantity, price, date, imageUrl }) => (
              <div key={name} className="border-b border-gray-200 py-4">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="w-full md:w-24 mb-2 md:mb-0">
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
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-medium">{name}</div>
                    <div className="text-sm">Quantity: {quantity}</div>
                    <div className="text-sm">Price: ${(price ?? 0).toFixed(2)}</div>
                    <div className="text-sm">
                      Date: {date ? format(new Date(date.seconds * 1000), "yyyy-MM-dd") : "N/A"}
                    </div>
                    <div className="flex mt-2 space-x-2">
                      <Button
                        aria-label="Decrement quantity"
                        variant="ghost"
                        onClick={() => removeItem(name)}
                        className="text-red-500">
                        <span>▼</span>
                      </Button>
                      <Button
                        aria-label="Increment quantity"
                        variant="ghost"
                        onClick={() => incrementQuantity(name)}>
                        <span className="text-green-500">▲</span>
                      </Button>
                      <Button
                        aria-label="Delete all"
                        variant="ghost"
                        onClick={deleteAll}
                        className="text-red-500">
                        Delete All
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
