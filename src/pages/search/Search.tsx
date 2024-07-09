import React, { useState } from "react";
import { Box, Button, Modal, Drawer, Divider } from "@mui/material";
import DataTable from "../../components/extract/DataTable";
import UploadButton from "../../components/UploadButton";
import Header from "../../components/Header";
import Assistant from "../../components/chat/assistant/Assistant";
import { useWebSocket } from "../../context/WebSocketProvider";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

const Search: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const data = useWebSocket();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const drawerList = () => (
    <Box
      sx={{ width: "50vh" }}
      role="presentation"
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setDrawerOpen(false);
        }
      }}
    >
      <Assistant />

      <Divider />
    </Box>
  );

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
        <Box sx={{ width: "90%", maxWidth: "1200px" }}>
          <DataTable data={data} />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <UploadButton onModalClose={handleClose} />
            </Box>
          </Modal>
        </Box>
        <Box
          sx={{
            position: "fixed",
            right: 30,
            top: 20,
            display: "flex",
            gap: 1,
          }}
        >
          <Button
            sx={{
              borderRadius: "8px",
              color: "white",
              backgroundColor: "rgb(73 ,73, 73)",
              "&:hover": { backgroundColor: "grey" },
              textTransform: "none",
            }}
            onClick={toggleDrawer(true)}
          >
            AI-Assistant
          </Button>
          <Button
            sx={{
              borderRadius: "8px",
              color: "white",
              backgroundColor: "red",
              "&:hover": { backgroundColor: "darkred" },
              textTransform: "none",
            }}
            onClick={handleOpen}
          >
            Add Files
          </Button>
        </Box>
      </Box>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
    </Box>
  );
};

export default Search;
