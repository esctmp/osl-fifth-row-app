import React from "react";
import { useState } from 'react';
import {
    Card,
    CardContent,
    Container,
    Divider,
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Input,
    Button,
    Grid,
    RadioGroup,
    Radio,
    FormControl,
    Stack,
    MenuItem,
} from "@material-ui/core";

export const TableHeader = ({ text, sx = {} }) =>
    <>
        <Typography sx={{ fontWeight: 'bold', mb: 0, ...SVGTextPositioningElement }}>
            {text}
        </Typography>
    </>


export const TableDescription = ({ text, sx = {} }) =>
    <>
        <Typography sx={{ fontStyle: 'italic', mb: 0, ...SVGTextPositioningElement }}>
            {text}
        </Typography>
    </>

export const TableColHeaders = ({ colNames, colConfig }) =>
    <>
        {colNames.map((colName, j) =>
            <Grid item display="flex" lg={colConfig[j]} md={colConfig[j]} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
                <Box display="flex" width="100%" alignItems="center" justifyContent="center" sx={{ backgroundColor: 'black', padding: "8px" }}>
                    <Typography align="center" sx={{ fontWeight: 'bold', color: 'white' }}>
                        {colName}
                    </Typography>
                </Box>
            </Grid>
        )}
    </>

export const TableRowName = ({ rowName, rowNameAlign='', sx = {} }) =>
    <Box display="flex" width="100%" alignItems="center" justifyContent="center" sx={{ padding: "8px" }}>
        <Typography align={rowNameAlign != '' ? rowNameAlign : "center"} sx={{ fontWeight: 'bold' }}>
            {rowName}
        </Typography>
    </Box>

export const TableDeleteRow = ({ onClickFunction }) =>
  <>
    <Grid item alignItems='stretch' lg={12} md={12} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
      <Button
        id='delete-row'
        variant='outlined'
        color='error'
        display='flex'
        sx={{ fontSize: 28, height: '30px', width: '100%' }}
        onClick={onClickFunction}
      >
        -
      </Button>
    </Grid>
  </>

export const TableAddRow = ({ onClickFunction }) =>
  <>
    <Grid item alignItems='stretch' lg={12} md={12} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
      <Button
        id='add-row'
        variant='outlined'
        display='flex'
        sx={{ fontSize: 28, height: '30px', width: '100%' }}
        onClick={onClickFunction}
      >
        +
      </Button>
    </Grid>
  </>
