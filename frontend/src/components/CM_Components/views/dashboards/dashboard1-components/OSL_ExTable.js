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
    date: "13 June 2023",
    epf_Name: "Yonex Open Championship",
    status: "Pending Approval",
    pbg: "error.main",
    club: "Badminton Club",
    action: "EXPORT"
  },
  {
    id: "2",
    date: "5 June 2023",
    epf_Name: "Real Homes WP Theme",
    status: "Pending Approval",
    pbg: "error.main",
    club: "Badminton Club",
    action: "EXPORT"
  },
  {
    id: "3",
    date: "3 Jun 2023",
    epf_Name: "Roboclash 2023",
    status: "Pending Approval",
    pbg: "error.main",
    club: "SOAR Club",
    action: "EXPORT"
  },
  {
    id: "4",
    date: "25 May 2023",
    epf_Name: "Fight Day",
    status: "Pending Changes From Club",
    pbg: "primary.main",
    club: "Judo Club",
    action: "EXPORT"
  },
  {
    id: "5",
    date: "24 May 2023",
    epf_Name: "Where are Shadows",
    status: "Pending Changes From Club",
    pbg: "primary.main",
    club: "Photography Club",
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
          <TableRow key={product.epf_Name}>
            <TableCell
            sx={{ width: "10px", maxWidth: "50px" }}
            >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {product.id}
              </Typography>
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
                  // fontWeight: "600"
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