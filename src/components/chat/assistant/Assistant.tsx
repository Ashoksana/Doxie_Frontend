import React, { useEffect, useState, FormEvent } from "react";
import {
  Box,
  Container,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import bot_logo from "../../../assets/png/bot_logo.png";
import { axiosInstance } from "../../../config/config";
import "./Assistant.css";

interface IMessage {
  userMessage: string;
  responseMessage: string;
}

const Assistant: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<IMessage[]>([]);
  const [showAnimation, setShowAnimation] = useState<boolean>(true);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState<boolean>(false);

  const logoAnimationDuration = 3000;
  useEffect(() => {
    setTimeout(() => {
      setShowAnimation(false);
      setShowWelcomeMessage(true);
      setTimeout(() => {
        setShowWelcomeMessage(false);
      }, 4000);
    }, logoAnimationDuration);
  }, []);

  const sendMessageHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setResponseMessage((prev) => [
      ...prev,
      { userMessage: message, responseMessage: "" },
    ]);

    axiosInstance
      .post<{ message: string }>("http://127.0.0.1:4000/api/chatbot", {
        message,
      })
      .then((response) => {
        setResponseMessage((prev) => [
          ...prev.slice(0, -1),
          { userMessage: message, responseMessage: response.data.message },
        ]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      })
      .finally(() => {
        setMessage("");
      });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "64vh",
        display: "flex",
        width: "107%",
        paddingRight: "10%",
        flexDirection: "column",
      }}
    >
      {showAnimation || showWelcomeMessage ? (
        <Box
          id="animationContainer"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={bot_logo} alt="Bot" className="botLogoAnimation" />
          {showWelcomeMessage && (
            <Typography className="typingEffect">
              Welcome to Doxie's AI assistant...
            </Typography>
          )}
        </Box>
      ) : (
        <>
          <Box>
            <Box
              sx={{
                background: "rgba(240, 240, 240)",
                height: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  height={41}
                  src={bot_logo}
                  alt="logo-doxie my-auto"
                  style={{ display: "block", margin: "auto" }}
                />
              </Box>
            </Box>
          </Box>

          <Box flexGrow={1} overflow="auto" id="msgCon" sx={{ ml: 2, mr: 2 }}>
            {responseMessage.map((mes, index) => (
              <Box
                key={index}
                sx={{ display: "flex", flexDirection: "column", mb: 2 }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccountCircleIcon className="user_icon_container" />
                  <Typography sx={{ ml: 1 }}>{mes.userMessage}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgb(242,242,242)",
                    p: 1,
                    mt: 1,
                  }}
                >
                  {!loading ? (
                    <>
                      <img src={bot_logo} alt="Bot" width="40" />
                      <Typography sx={{ ml: 1 }}>
                        {mes.responseMessage}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <img src={bot_logo} alt="Bot" width="40" />
                      <Typography sx={{ ml: 1 }}>...</Typography>
                    </>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            component="form"
            onSubmit={sendMessageHandler}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "50px",
              maxHeight: "40px",
              ml: 2,
              mr: 2,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Send a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              InputProps={{
                sx: {
                  borderRadius: "12px",
                  height: "40px",
                  padding: "10px",
                  fontSize: "0.875rem",
                },
              }}
              sx={{ mr: 1 }}
            />
            <IconButton sx={{ color: "red" }} type="submit">
              <SendIcon />
            </IconButton>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Assistant;