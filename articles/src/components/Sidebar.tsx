import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface SidebarProps {
  categories: string[];
  sources: { id: string; name: string }[];
  onFilter: (type: "category" | "source", value: unknown | string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, sources, onFilter }) => {
  return (
    <>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select onChange={(e) => onFilter("category", e.target.value)}>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Source</InputLabel>
        <Select onChange={(e) => onFilter("source", e.target.value)}>
          {sources.map((source) => (
            <MenuItem key={source.id} value={source.id}>
              {source.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default Sidebar;
