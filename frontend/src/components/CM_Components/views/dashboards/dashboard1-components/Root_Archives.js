import React, {useState} from "react";
import TablePagination from "@material-ui/core/TablePagination";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  InputBase,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";

const Root_Archives = () => {

  const [page, setPage] = React.useState(0);
  const rowsPerPage = 3; // Number of rows to display per page
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("EPF ID");
  const [products, setProducts] = React.useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset page when the search term changes
  };

  // Function to handle search by dropdown change
  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
    setPage(0); // Reset page when the search by option changes
  };

  const sortedProducts = products.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
  
    if (sortOrder === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  // Filter products based on search term and selected search by option
  const filteredProducts = sortedProducts.filter((product) => {
    if (searchTerm === "") return true;

    switch (searchBy) {
      case "EPF ID":
        return product.id.includes(searchTerm);
      case "Club":
        return product.club.toLowerCase().includes(searchTerm.toLowerCase());
      case "Name":
        return product.epf_Name.toLowerCase().includes(searchTerm.toLowerCase());
      default:
        return true;
    }
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const slicedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ARGGHHHHH")
        const response = await axios.get("http://localhost:3000/epfs/getEPFs"); // Replace with your actual API endpoint
        console.log("hi");

        const approvedData = response.data.filter(item => item.status === "Approved");

        const transformedData = approvedData.map((item) => {
          let pbg;
  
          if (item.status === "Approved") {
            pbg = "#66FF00";
          } else if (item.status === "Pending Approval") {
            pbg = "#FF6600";
          } else if (item.status === "Rejected") {
            pbg = "#CC0000";
          } else if (item.status === "Draft") {
            pbg = "#666666";
          }
  
          return {
            id: item.epf_id.toString(),
            date: new Date(item.date_created).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            epf_Name: item.b_event_name,
            status: item.status,
            pbg: pbg,
            club:item.a_organisation,
            // action:"EXPORT"
          };
        });
        setProducts(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div style={{ overflowX: "auto" }}> {/* Add container with overflow scrolling */}
    <Box mb={3}
    sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ marginLeft: 'auto' }}>
        <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
          <Select value={searchBy} onChange={handleSearchByChange}>
            <MenuItem value="EPF ID">EPF ID</MenuItem>
            <MenuItem value="Club">Club</MenuItem>
            <MenuItem value="Name">Name</MenuItem>
          </Select>
        </FormControl>
        <InputBase
          placeholder={`Search by ${searchBy}`}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        </Box>
      </Box>
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
              EPF Id
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Date
              <span onClick={handleSort} style={{ cursor: "pointer" }}>
                {sortOrder === "asc" ? " ▲" : " ▼"}
              </span>
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
          {/* <TableCell>
            <Typography color="textSecondary" variant="h6">
              Actions
            </Typography>
          </TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {slicedProducts.map((product) => (
          <TableRow key={product.name}>
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
            <Link
                  to={ `/root/epf/view/${product.id}`}
                >
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
                  // component={Link}
                  // to="/fifthrow/epf/submit"
                  >
                    {product.epf_Name}
                  </Typography>
                </Link>
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
            {/* <TableCell>
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
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      <TablePagination
        rowsPerPageOptions={[]} // Disable rows per page selection
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Table>
    </div>
  );
};

export default Root_Archives;