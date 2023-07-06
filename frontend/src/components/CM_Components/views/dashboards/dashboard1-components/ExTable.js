import React from "react";
import TablePagination from "@material-ui/core/TablePagination";
import { Link } from "react-router-dom";
import products from "./Data.json"

import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from "@material-ui/core";

// const products = [
//   {
//     id: "1",
//     date: "13 June 2023",
//     epf_Name: "Yonex Open Championship",
//     status: "Pending Approval",
//     pbg: "error.main",
//   },
//   {
//     id: "2",
//     date: "5 June 2023",
//     epf_Name: "Real Homes WP Theme",
//     status: "Pending Approval",
//     pbg: "error.main",
//   },
//   {
//     id: "3",
//     date: "9 May 2023 Jamil",
//     epf_Name: "Victor Badminton Competition",
//     status: "Need Changes",
//     pbg: "primary.main",
//   },
//   {
//     id: "4",
//     date: "27 March 2023",
//     epf_Name: "Recess Week Friendlies",
//     status: "Approved",
//     pbg: "success.main",
//   },
//   {
//     id: "5",
//     date: "14 Feb 2023",
//     epf_Name: "Valentines' HEARTminton",
//     status: "Approved",
//     pbg: "success.main",
//   }
// ];

const ExTable = () => {

  
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5; // Number of rows to display per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const slicedProducts = products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div style={{ overflowX: "auto" }}> {/* Add container with overflow scrolling */}
    <Table
      aria-label="simple table"
      sx={{
        mt: 3,
        whiteSpace: "nowrap",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Id
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Date
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Name
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Status
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {slicedProducts.map((product) => (
          <TableRow key={product.name}>
            <TableCell>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {product.id}
              </Typography>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                    {product.date}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
            <Typography
                  sx={{
                    fontWeight: "600",
                    color: "inherit", // Set the color to inherit to avoid the default purple color
                    textDecoration: "none", // Remove underline
                    "&:visited": {
                      color: "inherit", // Set the color to inherit for visited link styles
                    },
                  }} 
                  variant="h6"
                  component={Link}
                  to="/osl/epf/submit">
                  {product.epf_Name}
              </Typography> 
            </TableCell>
            <TableCell>
              <Chip
                sx={{
                  pl: "4px",
                  pr: "4px",
                  backgroundColor: product.pbg,
                  color: "#fff",
                }}
                size="small"
                label={product.status}
              ></Chip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TablePagination
        rowsPerPageOptions={[]} // Disable rows per page selection
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Table>
    </div>
  );
};

export default ExTable;
