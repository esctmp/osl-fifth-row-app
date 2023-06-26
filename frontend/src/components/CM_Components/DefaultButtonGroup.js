import React from "react";

import { Box, Button, ButtonGroup } from "@material-ui/core";

import BaseCard from "../BaseCard/BaseCard";

const DefaultButtonGroup = () => {
  return (
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Box>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button>Filter By...</Button>
            <Button>Export</Button>
          </ButtonGroup>
        </Box>
      </Box>

  );
};

export { DefaultButtonGroup };
