import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "../../assets/newUi/SearchIcon.svg"; // Adjust the path to your search icon

const DatePicker: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "200px",
        justifyContent: "space-between",
        borderRadius: "10px",
        border: "1px solid #E0E0E0",
        background: "#FFF",
      }}
    >
      <IconButton size="small">
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>
      <Typography
        sx={{
          color: "#5B5E6C",
          fontSize: "14px",
          fontWeight: 400,
        }}
      >
        9 May, 2024
      </Typography>
      <IconButton size="small">
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default DatePicker;
