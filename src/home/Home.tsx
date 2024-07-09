import React from "react";
import "./Home.css";
import logo from "../assets/svg/doxie-main-logo.svg";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Header from "../components/Header";
import ingest from "../assets/svg/icons/ingect.svg";
import search from "../assets/svg/icons/search.svg";
import queryicon from "../assets/svg/icons/query.svg";

const Home: React.FC = () => {
  return (
    <Box>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "calc(100vh - 80px)",
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        <img width={60} src={logo} alt="" />
        <Typography variant="body1" sx={{ mt: 2, color: "black" }}>
          Enhance PO Visibility with Effortless Precision
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          {/* Ingest Card */}
          <Box
            className="card_container_home"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "20px",
            }}
          >
            <img src={ingest} alt="ingest" />
            <Typography variant="body1" sx={{ mt: 1, color: "black" }}>
              Upload
            </Typography>
            <Box
              className="card_discription_container py-3 px-2"
              sx={{ mt: 1 }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "black",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Start Unleashing Insights: Begin Ingesting Your Data Today!
              </Typography>
            </Box>
          </Box>

          {/* Search Card */}
          <Box
            className="card_container_home"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "20px",
            }}
          >
            <img src={search} alt="search" />
            <Typography variant="body1" sx={{ mt: 1, color: "black" }}>
              Extract
            </Typography>
            <Box
              className="card_discription_container py-3 px-2"
              sx={{ mt: 1 }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "black",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Discover with Ease: Effortlessly Search Through Your Ingested
                Data
              </Typography>
            </Box>
          </Box>

          {/* Chat Card */}
          <Box
            className="card_container_home"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "20px",
            }}
          >
            <img src={queryicon} alt="chat" />
            <Typography variant="body1" sx={{ mt: 1, color: "black" }}>
              AI-Assistant
            </Typography>
            <Box
              className="card_discription_container py-3 px-2"
              sx={{ mt: 1 }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "black",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Unlock Knowledge in Your Data: Pose Queries and Find Answers
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", mt: 2, gap: "10px" }}>
          <Button
            component={Link}
            to="/Search"
            sx={{
              padding: "10px",
              color: "white",
              borderRadius: "8px",
              backgroundColor: "red",
              "&:hover": { backgroundColor: "darkred", color: "white" },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
