import React from "react";
import { Box } from "@mui/material";

const DottedLine: React.FC = () => (
  <Box
    component="hr"
    sx={{
      border: 0,
      borderTop: "1px dotted #BFBFBF",
      margin: "5px 0",
    }}
  />
);

export default DottedLine;
