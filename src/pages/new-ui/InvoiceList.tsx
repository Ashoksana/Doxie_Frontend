import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, SvgIcon } from "@mui/material";
import MainTable from "../../components/newUi/table/MainTable";
import CustomButton from "../../components/newUi/CustomButton";
import DashboardIcon from "../../assets/newUi/dashboard-regular.svg";
import UploadIcon from "../../assets/newUi/upload-regular.svg";
import ReportIcon from "../../assets/newUi/Report-regular.svg";
import DatePicker from "../../components/newUi/DatePicker";
import SearchBar from "../../components/newUi/SearchBar";
import ChatButton from "../../components/chat/ChatButton";
import Header from "../../pages/new-ui/Header";  
import { useNavigate } from 'react-router-dom';

const InvoiceList = () => {
    const handleClick = () => {
        alert("Button clicked!");
    };

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');  
    };

    const BackIcon = () => (
        <SvgIcon sx={{ width: "var(--Number-Scale-2s-16, 18px)", height: "var(--Number-Scale-2s-16, 18px)" }}>
            <path d="M4.5 10.5L2 8M2 8L4.5 5.5M2 8H14" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
        </SvgIcon>
    );

    const tableCellStyle = {
        color: "var(--black-100, #1C1C1C)",
        fontSize: "13px",
        fontStyle: "normal",
        height: "70px",
        fontWeight: 400,
        lineHeight: "18px",
        padding: "10px",  
        borderBottom: "1px solid rgba(224, 224, 224, 1)",
        overflow: "hidden",  
        textOverflow: "ellipsis",  
        whiteSpace: "normal"  
    };
                                          
    const invoiceDetails = [
        {
            partId: "HEM-208-5",
            description: "ATTN: Joshua Parsons Hold for Phillip OGG Must be there before 05/24/24",
            price: "64.75",
            qtyOrdered: 3,
            qtyReceived: 3,
            amount: "194.25",
            invoiceDate: "06-12-2024",
            receiptDate: "06-13-2024"
        },
        {
            partId: "HEM-206-3",
            description: "Eliminator 208 Hydraulic Fluid 32 (5 GAL PAIL) ATTN: Joshua Parsons Hold for Phillip OGG",
            price: "64.75",
            qtyOrdered: 10,
            qtyReceived: 5,
            amount: "194.25",
            invoiceDate: "06-11-2024",
            receiptDate: "06-13-2024"
        },
        {
            partId: "HEM-208-5",
            description: "ATTN: Joshua Parsons Hold for Phillip OGG Must be there before 05/24/24",
            price: "64.75",
            qtyOrdered: 3,
            qtyReceived: 3,
            amount: "194.25",
            invoiceDate: "06-12-2024",
            receiptDate: "06-13-2024"
        },
        {
            partId: "HEM-206-3",
            description: "Eliminator 208 Hydraulic Fluid 32 (5 GAL PAIL) ATTN: Joshua Parsons Hold for Phillip OGG",
            price: "64.75",
            qtyOrdered: 10,
            qtyReceived: 5,
            amount: "194.25",
            invoiceDate: "06-11-2024",
            receiptDate: "06-13-2024"
        },
    ];

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
                <Box sx={{ backgroundColor: "#F5F7FA", width: "80vw", height: "100vh" }}>
                    <Box sx={{ padding: "20px" }}>
                    <Button onClick={handleBack} startIcon={<BackIcon />} sx={{ margin: "10px" }}>
                            Back
                    </Button>
                        <Box sx={{ display: "flex", gap: "20px", padding: "20px" }}>
                            <DatePicker />
                            <SearchBar />
                        </Box>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="invoice details table">
                                <TableHead>
                                    <TableRow sx={{ height: "60px", width: "1076px", borderRadius : "4px 4px 0px 0px", background: "rgba(144, 147, 171, 0.40)",}}>
                                        <TableCell sx={tableCellStyle}>Part ID</TableCell>
                                        <TableCell sx={tableCellStyle}>Description</TableCell>
                                        <TableCell sx={tableCellStyle}>Price</TableCell>
                                        <TableCell sx={tableCellStyle}>Qty Ordered</TableCell>
                                        <TableCell sx={tableCellStyle}>Qty Received</TableCell>
                                        <TableCell sx={tableCellStyle}>Amount</TableCell>
                                        <TableCell sx={tableCellStyle}>Invoice Date</TableCell>
                                        <TableCell sx={tableCellStyle}>Receipt Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {invoiceDetails.map((row, index) => (
                                        <TableRow key={index} sx={{
                                            '&:nth-of-type(odd)': { backgroundColor: '#F6F3F4' },
                                            '&:nth-of-type(even)': { backgroundColor: '#FFF' },
                                        }}>
                                            <TableCell sx={tableCellStyle}>{row.partId}</TableCell>
                                            <TableCell sx={tableCellStyle}>{row.description}</TableCell>
                                            <TableCell sx={tableCellStyle}>${row.price}</TableCell>
                                            <TableCell sx={tableCellStyle}>{row.qtyOrdered}</TableCell>
                                            <TableCell sx={tableCellStyle}>{row.qtyReceived}</TableCell>
                                            <TableCell sx={tableCellStyle}>${row.amount}</TableCell>
                                            <TableCell sx={tableCellStyle}>{row.invoiceDate}</TableCell>
                                            <TableCell sx={tableCellStyle}>{row.receiptDate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
            <ChatButton />
        </Box>
    );
};

export default InvoiceList;