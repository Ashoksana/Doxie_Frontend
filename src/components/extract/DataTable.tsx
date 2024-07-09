import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { Box, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface Column {
  id: "date" | "po" | "customer" | "shipToAddress" | "image";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "date", label: "Date", minWidth: 100 },
  { id: "po", label: "PO Number", minWidth: 100 },
  { id: "customer", label: "Customer", minWidth: 150 },
  { id: "shipToAddress", label: "Ship To Address", minWidth: 200 },
  { id: "image", label: "Referrence", minWidth: 100 },
];

interface Data {
  date: string;
  po: string;
  customer: string;
  shipToAddress: string;
  image: string;
}

interface DataTableProps {
  data: Data[];
}

export default function DataTable({ data }: DataTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (image: string) => {
    setCurrentImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((row) => {
    const poNumber = row.po ? row.po.toString() : "";
    return poNumber.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSort = () => {
    setSortDirection((prevDirection) => {
      if (prevDirection === "asc") return "desc";
      return "asc";
    });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortDirection) return 0;
    if (a.date === b.date) return 0;
    if (sortDirection === "asc") {
      return new Date(a.date) > new Date(b.date) ? 1 : -1;
    } else {
      return new Date(a.date) < new Date(b.date) ? 1 : -1;
    }
  });

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box sx={{ padding: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search PO number"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          fullWidth
        />
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                  {column.id === "date" && (
                    <IconButton onClick={handleSort} size="small">
                      {sortDirection === "asc" ? (
                        <ArrowUpwardIcon fontSize="inherit" />
                      ) : (
                        <ArrowDownwardIcon fontSize="inherit" />
                      )}
                    </IconButton>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "image" ? (
                            <ImageOutlinedIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => handleClickOpen(value)}
                            />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  style={{ textAlign: "center", height: "300px" }}
                >
                  Add files to see the data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogContent>
          <img
            src={`data:image/jpeg;base64,${currentImage}`}
            alt="Enlarged Image"
            style={{
              maxWidth: "100%",
              maxHeight: "80vh",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
