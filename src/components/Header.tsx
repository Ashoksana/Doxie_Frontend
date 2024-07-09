import React from "react";
import logo from "../assets/svg/logo.svg";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const Header: React.FC = () => {
  return (
    <Box
      sx={{
        background: "rgba(240, 240, 240);",
        height: "80px",
        borderBottom: "0.5px solid #E6EFF5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Link to="/">
          <img height={41} src={logo} alt="logo-doxie my-auto" />
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
