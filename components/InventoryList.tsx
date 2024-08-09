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
  decrementQuantity: (name: string) => void;
  deleteAll: () => void;
}

const InventoryList: React.FC<InventoryListProps> = ({
  inventory,
  removeItem,
  incrementQuantity,
  decrementQuantity,
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map(({ name, quantity, price, date, imageUrl, unit }) => (
                <TableRow key={name}>
                  <TableCell>
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={name}
                        width={200} // Replace with actual image dimensions
                        height={200}
                        onError={(e) => {
                          console.error("Error loading image:", e);
                        }}
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-600 flex items-center justify-center text-white">
                        No Image
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell>{quantity} {unit}</TableCell>
                  <TableCell>${(price ?? 0).toFixed(2)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {date
                      ? format(new Date(date.seconds * 1000), "yyyy-MM-dd")
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Button
                      aria-label={`Decrement quantity for ${name}`}
                      variant="ghost"
                      onClick={() => decrementQuantity(name)}
                      className="text-red-500">
                      <span>▼</span>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      aria-label={`Increment quantity for ${name}`}
                      variant="ghost"
                      onClick={() => incrementQuantity(name)}>
                      <span className="text-green-500">▲</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Mobile view */}
          <div className="md:hidden">
            {inventory.map(({ name, quantity, price, date, imageUrl, unit }) => (
              <div key={name} className="border-b border-gray-200 py-4">
                <div className="flex flex-row items-start">
                  <div className="flex-shrink-0 w-24 h-24">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={name}
                        width={100} // Adjust the size for mobile
                        height={100}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-600 flex items-center justify-center text-white">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 ml-4">
                    <div className="text-lg font-medium">{name}</div>
                    <div className="text-sm">Quantity: {unit} {quantity}</div>
                    <div className="text-sm">Price: ${(price ?? 0).toFixed(2)}</div>
                    <div className="text-sm">
                      Date:{" "}
                      {date
                        ? format(new Date(date.seconds * 1000), "yyyy-MM-dd")
                        : "N/A"}
                    </div>
                    <div className="flex mt-2 space-x-2">
                      <Button
                        aria-label={`Decrement quantity for ${name}`}
                        variant="ghost"
                        onClick={() => decrementQuantity(name)}
                        className="text-red-500">
                        <span>▼</span>
                      </Button>
                      <Button
                        aria-label={`Increment quantity for ${name}`}
                        variant="ghost"
                        onClick={() => incrementQuantity(name)}>
                        <span className="text-green-500">▲</span>
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
        <Button
          aria-label="Delete all items"
          variant="ghost"
          onClick={deleteAll}
          className="text-red-500 mt-2">
          Delete All
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InventoryList;
