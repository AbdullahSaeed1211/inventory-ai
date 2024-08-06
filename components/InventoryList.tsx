"use client";
import { Box, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { format } from "date-fns";
import { InventoryItem } from "@/types";

interface InventoryListProps {
  inventory: InventoryItem[];
  removeItem: (name: string) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ inventory, removeItem }) => {
  return (
    <Box width="100%" maxWidth="800px" mx="auto">
      <Box
        width="100%"
        height="50px"
        bgcolor="#ADD8E6"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
      >
        <Typography variant="h6" color="#333">
          Product
        </Typography>
        <Typography variant="h6" color="#333">
          Quantity
        </Typography>
        <Typography variant="h6" color="#333">
          Date
        </Typography>
        <div></div> {/* Empty column for the delete button */}
      </Box>
      {inventory.map(({ name, quantity, date }) => (
        <Box
          key={name}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor="#f0f0f0"
          px={2}
          py={1}
          mb={1}
        >
          <Typography variant="body1" color="#333">
            {name}
          </Typography>
          <Typography variant="body1" color="#333">
            {quantity}
          </Typography>
          <Typography variant="body1" color="#333">
            {date ? format(new Date(date.seconds * 1000), "yyyy-MM-dd") : "N/A"}
          </Typography>
          <IconButton onClick={() => removeItem(name)}>
            <Delete />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default InventoryList;
