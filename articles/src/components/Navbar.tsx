import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase } from "./Navbar.styles";

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            ALL YOUR NEWS
          </Typography>
          <Search>
            <SearchIconWrapper>
              <span role="img" aria-label="search">
                🔍
              </span>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => onSearch(e.target.value)}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
