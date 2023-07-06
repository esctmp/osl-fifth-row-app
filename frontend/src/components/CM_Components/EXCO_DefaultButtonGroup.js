import React from "react";

import { Box, Button, ButtonGroup } from "@material-ui/core";

import BaseCard from "../BaseCard/BaseCard";

const EXCO_DefaultButtonGroup = () => {
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
          </ButtonGroup>
        </Box>
      </Box>

  );
};

export { EXCO_DefaultButtonGroup };
