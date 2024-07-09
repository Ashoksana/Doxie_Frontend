import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  tableCellClasses,
  TablePagination,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(226,227,230)",
    color: "black",
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Data {
  document_id: string;
  po_no: string;
  phone_number: string;
  address: string;
}

export default function MainTable({ defaultValue }: { defaultValue: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<{ po_no: string; phone_number?: string; address?: string, document_id?: string }>({ po_no: '' });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [data, setData] = useState<Data[]>([]);
  const [address, setAddress] = useState<string>(defaultValue)
  const [po_no, setPoNo] =  useState<string>(defaultValue)
  const [phone_number, setPhoneNumber] = useState<string>(defaultValue)
  

  const navigate = useNavigate();
  const handleInvoiceClick = (po_no: string) => {
    navigate('/Invoice', { state: { po_no: po_no } });
    console.log(po_no)
  };

useEffect(() => {
  fetch('http://localhost:5000/api/data')
    .then(response => response.json())
    .then(data => setData(data));
}, []);

const updateDocument = (po_no: string, phone_number: string, address: string) => {

  alert(po_no + "" + "" + phone_number + "" + address)

  const replacedString = po_no.replace(/#/g, '%23');
  const url: string = 'http://localhost:5000/api/update_document/' + replacedString;
  const data: { [key: string]: string } = {
      'phone_number': phone_number, 
      'address': address
  };
  // console.log(po_no);

  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then((response: Response) => response.json())
  .then((data: unknown) => console.log(data))
  .catch((error: unknown) => {
      console.error('Error:', error);
  });
}

  const handleOpen = (row: Data) => {
    setSelectedRow(row);
    setPhoneNumber(row.phone_number)
    setAddress(row.address)
    setPoNo(row.po_no)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsMinimized(false);
    setIsMaximized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    setIsMinimized(false); 
  };

  const handleRestore = () => {
    setIsMinimized(false);
    console.log(phone_number, address);
  };

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };


  const handleSave = () => {
    
    updateDocument(selectedRow.po_no , phone_number, address);
    setData(data.map(item => item.po_no === selectedRow.po_no ? {...item, phone_number, address} : item));
    setShowSuccessMessage(true);
    setOpen(false);
    setIsMinimized(false);
    setIsMaximized(false);
    setTimeout(() => {
    setShowSuccessMessage(false);
    }, 3000);   
  };

  const handleChangeRowsPerPage = (event: { target: { value: string; }; }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
{showSuccessMessage && (
    <Box sx={{
        position: 'fixed',
        left: '50%',
        top: '2%',
        transform: 'translateX(-50%)',
        zIndex: 1500,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 40px',
        color: 'black',
        borderRadius: '5px',
        backgroundColor: 'var(--Green-300, #87CAA2)',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    }}>
        <CheckCircleIcon sx={{ marginRight: 1 }} />
        <Typography variant="body1">Data is saved successfully</Typography>
    </Box>
)}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Document ID</StyledTableCell>
              <StyledTableCell>PO NO</StyledTableCell>
              <StyledTableCell>Phone No.</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{row.document_id}
                  </StyledTableCell>
                  <StyledTableCell>
        {row.po_no !== 'Manual Input Required' ? (
            <Button
                sx={{
                    textTransform: 'none',
                    justifyContent: 'flex-start',
                    color: '#06F', 
                    textDecoration: 'underline',
                    padding: 0,
                    minWidth: 'auto',
                    "&:hover": {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline'
                    }
                }}
                onClick={() => handleInvoiceClick(row.po_no)}
            >
                {row.po_no}
            </Button>
        ) : (
            <Typography sx={{ color: 'black', textAlign: 'left' }}>
                {row.po_no}
            </Typography>
        )}
    </StyledTableCell>
                  <StyledTableCell>{row.phone_number}</StyledTableCell>
                  <StyledTableCell>{row.address}</StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton onClick={() => handleOpen(row)}>
                      <VisibilityIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={isMaximized ? false : "xl"}
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              Document ID - {selectedRow.document_id}
            </Typography>
            <Box>
              {isMinimized ? (
                <IconButton aria-label="restore" onClick={handleRestore}>
                  <CropSquareIcon />
                </IconButton>
              ) : (
                <>
                  <IconButton aria-label="minimize" onClick={handleMinimize}>
                    <RemoveIcon />
                  </IconButton>
                  <IconButton aria-label="maximize" onClick={handleMaximize}>
                    <FullscreenIcon />
                  </IconButton>
                </>
              )}
              <IconButton aria-label="close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            height: isMaximized ? "90vh" : isMinimized ? "100px" : "800px",
            overflowY: "auto", 
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <img
                src="src/components/newUi/table/candidate.jpg" 
                alt="Document Preview"
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
            {!isMinimized && (
              <Grid item xs={12} md={5}>
                <Typography variant="subtitle1" gutterBottom>
                  Please fill in the details
                </Typography>
                <TextField
                  fullWidth
                  label="PO NO"
                  defaultValue={selectedRow.po_no}
                  variant="outlined"
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Phone No"
                  value={phone_number}
                  onChange={(e)=> setPhoneNumber(e.target.value)}
                  defaultValue={selectedRow.phone_number}
                  variant="outlined"
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Address"
                  value={address}
                  onChange={(e)=> setAddress(e.target.value)}
                  defaultValue={selectedRow.address}
                  variant="outlined"
                  margin="dense"
                  multiline
                  rows={4}
                />
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    sx={{
                      borderRadius: "10px",
                      background: "white",
                      boxShadow: "none",
                      marginRight: 2,
                      border: "1px solid gray",
                      color: "gray",
                      "&:hover": {
                        background: "#a6a6a6",
                        color: "white",
                      },
                    }}
                  >
                    Reset
                  </Button>
                  <div></div>
                  <Button
                    onClick={handleSave}
                    color="primary"
                    variant="contained"
                    sx={{
                      borderRadius: "10px",
                      background: "white",
                      boxShadow: "none",
                      border: "1px solid gray",
                      color: "gray",
                      "&:hover": {
                        background: "#a6a6a6",
                        color: "white",
                      },
                    }}
                  >
                    Save
                  </Button>
                </div>
              </Grid>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}