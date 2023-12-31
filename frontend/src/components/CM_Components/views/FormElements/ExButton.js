import React from "react";

import { Grid, Box } from "@material-ui/core";

import { ColorButtons } from "../../Forms/Button/ColorButtons";
import { SizeButton } from "../../Forms/Button/SizeButton";

import { OutlinedColorButtons } from "../../Forms/Button/OutlinedColorButtons";

import { TextColorButtons } from "../../Forms/Button/TextColorButtons";

import { IconColorButtons } from "../../Forms/Button/IconColorButtons";

import { FabDefaultButton } from "../../Forms/Button/FabDefaultButton";

import { DefaultButtonGroup } from "../../Forms/Button/DefaultButtonGroup";

const ExButton = () => {
  // 2

  return (
    <Box>
      <Grid container spacing={0}>
        {/* ------------------------- row 2 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <ColorButtons />
        </Grid>

        {/* ------------------------- row 4 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <SizeButton />
        </Grid>

        {/* ------------------------- row 2 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <OutlinedColorButtons />
        </Grid>

        {/* ------------------------- row 2 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <TextColorButtons />
        </Grid>
        {/* ------------------------- row 4 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <IconColorButtons />
        </Grid>
        {/* ------------------------- row 4 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <FabDefaultButton />
        </Grid>

        {/* ------------------------- row 4 ------------------------- */}
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <DefaultButtonGroup />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExButton;
