import React from "react";
import { Box, InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "../../assets/newUi/SearchIcon.svg"; // Adjust the path to your search icon

const SearchBar: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: "470px",
          height: "44px",
          gap: "10px",
          borderRadius: "10px",
          border: "1px solid #E0E0E0",
          background: "#FFF",
          boxShadow: "none",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
        />
      </Paper>
    </Box>
  );
};

export default SearchBar;
