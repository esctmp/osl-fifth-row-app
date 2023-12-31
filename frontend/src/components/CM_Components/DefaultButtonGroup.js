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
            <Button>Filter By Date</Button>
            <Button>Filter By Name</Button>
            <Button>Filter by Club</Button>
            <Button>Export All</Button>
          </ButtonGroup>
        </Box>
      </Box>

  );
};

export { DefaultButtonGroup };
