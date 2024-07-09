import React from "react";
import logo from "../../assets/svg/logo.svg";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import AlertIcon from "../../assets/newUi/Alert.svg";
import profile from "../../assets/svg/Ellipse 5.svg";
import { Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <Box sx={{ background: "#FFF", height: "80px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Adjusted to space-between
          alignItems: "center", // Adjusted to center
          padding: "23px",
        }}
      >
        <Link to="/">
          <img height={36} src={logo} alt="logo-doxie my-auto" />
        </Link>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center", // Adjusted to center
            gap: "10px",
          }}
        >
          <img
            style={{ width: "24px", height: "24px" }}
            src={AlertIcon}
            alt="Alert Icon"
          />
          <img
            style={{ width: "24px", height: "24px" }}
            src={profile}
            alt="Alert Icon"
          />
          <Typography
            sx={{
              color: "#363636",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
              margin: "10px",
            }}
          >
            John
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
