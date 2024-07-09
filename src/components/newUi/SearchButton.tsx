import React from "react";
import { Box, InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "../../assets/newUi/SearchIcon.svg"; // Adjust the path to your search icon

const SearchButton: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <IconButton
        sx={{
          display: "flex",
          padding: "11px 15px",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          background: "#e01e1e",
          boxShadow: "none", // Remove shadow
        }}
      >
        <img
          src={SearchIcon}
          alt="search icon"
          style={{ width: "20px", height: "20px" }}
        />
      </IconButton>
    </Box>
  );
};

export default SearchButton;
