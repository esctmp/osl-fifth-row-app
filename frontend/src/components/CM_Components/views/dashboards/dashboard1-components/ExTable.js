import React, { useContext,useState } from "react";
import TablePagination from "@material-ui/core/TablePagination";
import { Link } from "react-router-dom";
// import products from "./Data.json"
import axios from "axios";
import { UserID } from "../../../../../routes/UserID";


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


const ExTable = () => {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 3; // Number of rows to display per page
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("EPF ID");
  const [products, setProducts] = React.useState([]);
  const {userId} = useContext(UserID);
  
  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset page when the search term changes
  };

  // Function to handle search by dropdown change
  const handleSearchByChange = (event) => {
    setSearchBy(event.target.value);
    setSearchTerm(""); // Reset the search term when changing the search by option
    setPage(0); // Reset page when the search by option changes
  };

  // Filter products based on search term and selected search by option
  const filteredProducts = products.filter((product) => {
    if (searchTerm === "") return true;

    switch (searchBy) {
      case "EPF ID":
        return product.id.includes(searchTerm);
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
        console.log(userId)
        console.log("UID")
        const response = await axios.get(`https://mtdlypyeyk.execute-api.ap-southeast-1.amazonaws.com/staging/users/getEXCOEPFs?exco_user_id=${userId}`); // Replace with your actual API endpoint
        console.log("hi");
        const transformedData = response.data.map((item) => {
          let pbg;
  
          if (item.status === "Approved") {
            pbg = "#66FF00";
          } else if (item.status === "Pending") {
            pbg = "#FF6600";
          } else if (item.status === "Declined") {
            pbg = "#CC0000";
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
          };
        });
        setProducts(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once on component mount


  return (
    <div style={{ overflowX: "auto" }}> {/* Add container with overflow scrolling */}
      <Box mb={3}>
        <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
          <Select value={searchBy} onChange={handleSearchByChange}>
            <MenuItem value="EPF ID">EPF ID</MenuItem>
            <MenuItem value="Name">Name</MenuItem>
          </Select>
        </FormControl>
        <InputBase
          placeholder={`Search by ${searchBy}`}
          value={searchTerm}
          onChange={handleSearchChange}
        />
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
                <Link
                  to={ `/fifthrow/epf/view/${product.id}`}
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
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Table>
    </div >
  );
};

export default ExTable;
