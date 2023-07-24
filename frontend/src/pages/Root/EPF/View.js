import React from "react";

import { Card, CardContent, Box, Typography } from "@material-ui/core";

import Root_Archives from "../../../components/CM_Components/views/dashboards/dashboard1-components/Root_Archives";
import Root_Pending_Table from "../../../components/CM_Components/views/dashboards/dashboard1-components/Root_Pending_Table";
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
            <Root_Pending_Table />
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
            <Root_Archives />
          </Box>
        </CardContent>
      </Card>
    </Box>

    </div>

  );
};

export default EPFView;