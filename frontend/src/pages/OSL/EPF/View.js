import React from "react";

import { Card, CardContent, Box, Typography } from "@material-ui/core";

import OSL_ExTable from "../../../components/CM_Components/views/dashboards/dashboard1-components/OSL_ExTable";
import OSL_Archives_ExTable from "../../../components/CM_Components/views/dashboards/dashboard1-components/OSL_Archives_ExTable";
import { DefaultButtonGroup } from "../../../components/CM_Components/DefaultButtonGroup";



const EPFView = () => {

  return (
    <div>
      <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">Pending Approval</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ marginLeft: 'auto' }}>
              <DefaultButtonGroup />
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
            <OSL_ExTable />
          </Box>
        </CardContent>
      </Card>
    </Box>

    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">Archives</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ marginLeft: 'auto' }}>
              <DefaultButtonGroup />
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
            <OSL_Archives_ExTable />
          </Box>
        </CardContent>
      </Card>
    </Box>

    </div>

  );
};

export default EPFView;