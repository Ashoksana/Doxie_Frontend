import React, { useState, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../config/config";
import { Box, Button, Typography } from "@mui/material";

interface IngestProps {
  onModalClose?: () => void;
  onUploadSuccess?: () => void;
}

const Ingest: React.FC<IngestProps> = ({ onModalClose, onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file, file.name);
    });

    axiosInstance
      .post("http://127.0.0.1:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Files uploaded successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        onUploadSuccess?.();
      })
      .catch((error) => {
        console.error("Upload error:", error);
        toast.error("Upload failed. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });

    setTimeout(() => {
      onModalClose?.();
    }, 1500);
  };

  return (
    <Box>
      <Box
        sx={{
          border: "1px solid grey",
          borderRadius: "12px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Typography sx={{ color: "black" }}>
          Upload or Drag & drop any documents.
        </Typography>
        <Box>
          <Box>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ color: "black" }}
            />
            <Box>
              {/* <FcFolder style={{ fontSize: "20px", color: "blach" }} /> */}

              <label className="my-auto ms-1" style={{ color: "black" }}>
                {selectedFiles.map((file) => file.name).join(", ")}
              </label>

              {/* {selectedFiles.length === 0 && (
                <label className="my-auto ms-1" style={{ color: "black" }}>
                  Choose a file
                </label>
              )} */}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "right", marginTop: "20px" }}>
        <Button
          onClick={handleUpload}
          sx={{
            borderRadius: "8px",
            color: "white",
            backgroundColor: "red",
            "&:hover": { backgroundColor: "darkred" },
          }}
        >
          Upload Files
        </Button>
        <Button
          onClick={() => {
            setSelectedFiles([]);
            onModalClose?.();
          }}
          sx={{
            borderRadius: "8px",
            color: "white",
            marginLeft: "10px",
            backgroundColor: "grey",
            "&:hover": { backgroundColor: "darkred" },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default Ingest;
