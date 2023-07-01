import React from "react";

import { Card, CardContent, Box, Typography } from "@material-ui/core";

import ExTable from "../../../components/CM_Components/views/dashboards/dashboard1-components/ExTable";
import { EXCO_DefaultButtonGroup } from "../../../components/CM_Components/EXCO_DefaultButtonGroup";

const EPFView = () => {

  return (
    <div>
      <Box>  
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">Archives</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ marginLeft: 'auto' }}>
              <EXCO_DefaultButtonGroup />
            </Box>
          </Box>
         
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