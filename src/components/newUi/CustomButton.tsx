import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface CustomButtonProps {
  buttonName: string;
  onClick: () => void;
  icon?: string; // Path to the icon
}

const CustomButton: React.FC<CustomButtonProps> = ({
  buttonName,
  onClick,
  icon,
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        borderRadius: "0px",
        // background: "var(--Surface-Default, #FF1F1F)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#363636",
        width: "223px",
        padding: "11px 0px",
        fontSize: "16px",
        textTransform: "none",
        marginBottom: "10px",
        "&:hover": {
          backgroundColor: "inherit",
          color: "#e01e1e",
          borderLeft: "5px solid #e01e1e",
        },
      }}
    >
      {icon && (
        <img
          src={icon}
          alt={`${buttonName} icon`}
          style={{
            marginRight: "10px",
            width: "20px",
            height: "20px",
          }}
        />
      )}
      {buttonName}
    </Button>
  );
};

export default CustomButton;
