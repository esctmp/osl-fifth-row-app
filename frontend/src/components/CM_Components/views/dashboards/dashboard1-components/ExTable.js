import React from "react";
import TablePagination from "@material-ui/core/TablePagination";
import { Link } from "react-router-dom";
// import products from "./Data.json"
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
} from "@material-ui/core";


const ExTable = () => {


  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5; // Number of rows to display per page

  const [products, setProducts] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const slicedProducts = products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ARGGHHHHH")
        const response = await axios.get("http://localhost:3000/epfs/getEPFs"); // Replace with your actual API endpoint
        console.log("hi");
        const transformedData = response.data.map((item) => {
          let pbg;
  
          if (item.status === "Approved") {
            pbg = "success.main";
          } else if (item.status === "Need Changes") {
            pbg = "primary.main";
          } else if (item.status === "Pending Approval") {
            pbg = "error.main";
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
        // const transformedData = response.data.map((item) => ({
        //   id: item.epf_id.toString(),
        //   date: new Date(item.date_created).toLocaleDateString("en-US", {
        //     year: "numeric",
        //     month: "long",
        //     day: "numeric",
        //   }),
        //   epf_Name: item.b_event_name,
        //   status: item.status,
        //   pbg: "error.main", // Set the desired value for pbg
        // }));
        setProducts(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once on component mount


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
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Table>
    </div >
  );
};

export default ExTable;
