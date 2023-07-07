import React from "react";
import TablePagination from "@material-ui/core/TablePagination";
import { Link } from "react-router-dom";

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

const products = [
  {
    id: "1",
    date: "4 Apr 2023",
    epf_Name: "Happy go Lucky",
    status: "Approved",
    pbg: "success.main",
    club: "Happy Club",
    action: "EXPORT"
  },
  {
    id: "2",
    date: "2 Apr 2023",
    epf_Name: "Pep and Haaland",
    status: "Approved",
    pbg: "success.main",
    club: "Football Club",
    action: "EXPORT"
  },
  {
    id: "3",
    date: "29 March 2023",
    epf_Name: "SOAR Challenge 2023",
    status: "Approved",
    pbg: "success.main",
    club: "SOAR Club",
    action: "EXPORT"
  },
  {
    id: "4",
    date: "27 March 2023",
    epf_Name: "Recess Week Friendlies",
    status: "Approved",
    pbg: "success.main",
    club: "Badminton Club",
    action: "EXPORT"
  },
  {
    id: "5",
    date: "14 Feb 2023",
    epf_Name: "Valentines' HEARTminton OMOMOMOMO TESTING OVERFLOW",
    status: "Approved",
    pbg: "success.main",
    club: "Badminton Club",
    action: "EXPORT"
  }
];

const OSL_ExTable = () => {

  const [page, setPage] = React.useState(0);
  const rowsPerPage = 3; // Number of rows to display per page

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
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Club
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Actions
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {slicedProducts.map((product) => (
          <TableRow key={product.name}>
            <TableCell
            sx={{ width: "10px", maxWidth: "50px" }}
            >
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
                    {product.club}
                  </Typography>
                </Box>
              </Box>
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
                    {product.action}
                  </Typography>
                </Box>
              </Box>
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

export default OSL_ExTable;