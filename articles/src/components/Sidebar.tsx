import React from "react";
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface SidebarProps {
  categories: string[];
  sources: { id: string; name: string }[]; // Assuming sources have names
  onFilter: (type: "category" | "source", value: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, sources, onFilter }) => {
  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    onFilter("category", event.target.value as string);
  };

  const handleSourceChange = (event: SelectChangeEvent<string>) => {
    onFilter("source", event.target.value as string);
  };

  return (
    <div>
      <Typography variant="h6">Filters</Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          defaultValue=""
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Source</InputLabel>
        <Select defaultValue="" onChange={handleSourceChange} label="Source">
          <MenuItem value="">All Sources</MenuItem>
          {sources.map((source) => (
            <MenuItem key={source.id} value={source.id}>
              {source.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Sidebar;
