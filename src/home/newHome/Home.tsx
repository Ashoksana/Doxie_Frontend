import React from "react";
import { Box, Typography, Button } from "@mui/material";
import MainTable from "../../components/newUi/table/MainTable";
import CustomButton from "../../components/newUi/CustomButton";
import chatIcon from "../../assets/newUi/chat.svg";
import DashboardIcon from "../../assets/newUi/dashboard-regular.svg";
import DashboardIcon2 from "../../assets/newUi/dashboard-hover.svg";
import UploadIcon from "../../assets/newUi/upload-regular.svg";
import UploadIcon2 from "../../assets/newUi/upload-hover.svg";
import ReportIcon from "../../assets/newUi/Report-regular.svg";
import ReportIcon2 from "../../assets/newUi/Report-hover.svg";
import DatePicker from "../../components/newUi/DatePicker";
import SearchBar from "../../components/newUi/SearchBar";
import SearchButton from "../../components/newUi/SearchButton";
import ChatButton from "../../components/chat/ChatButton";
import Header from "../../pages/new-ui/Header";

const SummaryCard = ({ title, count, action }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
          // title === "Total Documents uploaded" ? "#7f8c8d" : "#E0E0E0",
        // color: title === "Total Documents uploaded" ? "#ffffff" : "#000000",
        color: "#5B5E6C",
        borderRadius: "10px",
        padding: "10px 20px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 300,
        height: 80,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle1" sx={{ fontSize: "0.95rem" }}>
          {title}
        </Typography>
        <Typography variant="h6" sx={{ fontSize: "1.8rem", fontWeight: "bold", color: "#000000" }}>
          {count}
        </Typography>
      </Box>
      {action && (
        <Button
          variant="text"
          size="small"
          onClick={action.onClick}
          sx={{
            color: title === "Upload Failed" ? "#D32F2F" : "inherit", // Special color for "Retry" button
            textTransform: "none",
            fontSize: "0.875rem",
            fontWeight: "bold",
          }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  );
};
const Home = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <Box>
      <Header />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "20vw",
            height: "100vh",
            backgroundColor: "#FFF",
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <CustomButton
              buttonName="Dashboard"
              onClick={handleClick}
              icon={DashboardIcon}
            />
            <CustomButton
              buttonName="Upload"
              onClick={handleClick}
              icon={UploadIcon}
            />
            <CustomButton
              buttonName="Report"
              onClick={handleClick}
              icon={ReportIcon}
            />
          </Box>
        </Box>

        <Box
          sx={{ backgroundColor: "#F5F7FA", width: "80vw", height: "100vh" }}
        >
          <Box sx={{ padding: "20px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px",
              }}
            >
              <SummaryCard
                title="Total Documents uploaded"
                count="5"
                action={undefined}
              />
              <SummaryCard
                title="Documents Processing"
                count="2"
                action={undefined}
              />
              <SummaryCard
                title="Manual Interpretation"
                count="3"
                action={undefined}
              />
              {/* <SummaryCard
                title="Upload Failed"
                count="10"
                action={{
                  label: "Retry",
                  onClick: () => console.log("Retry clicked"),
                }}
              /> */}
            </Box>
            <Box sx={{ display: "flex", gap: "20px", paddingLeft: "30px" }}>
              <SearchBar />
              <DatePicker />
              <SearchButton />
            </Box>
            <Box sx={{ margin: "30px" }}>
              <MainTable />
            </Box>
          </Box>
        </Box>
      </Box>
      <ChatButton />
    </Box>
  );
};

export default Home;
