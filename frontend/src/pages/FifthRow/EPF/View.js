import React from "react";

import { Card, CardContent, Box, Typography } from "@material-ui/core";

import ExTable from "../../../components/CM_Components/views/dashboards/dashboard1-components/ExTable";

const EPFView = () => {

  return (
    <div>
      <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">Basic Table</Typography>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <ExTable />
          </Box>
        </CardContent>
      </Card>
    </Box>
    </div>
  );
};

export default EPFView;