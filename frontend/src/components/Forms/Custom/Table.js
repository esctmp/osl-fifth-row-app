import React from "react";
import { useState, useEffect } from 'react';
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
import { Controller, useFieldArray, useWatch } from "react-hook-form";

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

const TableRowName = ({ rowName, rowNameAlign = '', sx = {} }) =>
  <Box display="flex" width="100%" alignItems="center" justifyContent="center" sx={{ padding: "8px" }}>
    <Typography align={rowNameAlign != '' ? rowNameAlign : "center"} sx={{ fontWeight: 'bold' }}>
      {rowName}
    </Typography>
  </Box>

const TableDeleteRow = ({ onClickFunction }) =>
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

const TableAddRow = ({ onClickFunction }) =>
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

const TableRowStatic = ({ settings, control, rowName, names, colConfig, minRows=3, rowMinHeight, rowNameAlign }) =>
  <>
    <Grid item display="flex" xs={colConfig[0]} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
      <TableRowName rowName={rowName} />
    </Grid>
    {names.map((name, j) =>
      <Grid item xs={colConfig[j + 1]} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
          <Controller
            name={`${name}`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                id={`${name}`}
                fullWidth
                multiline
                minRows={minRows}
                disableUnderline='true'
                onChange={onChange}
                value={value}
                disabled={!settings.enableInputs}
                sx={{ padding: "8px" }}
              />
            )}
          />
      </Grid>
    )}
  </>


/**
 * Given a list of form fields corr. to row names, return a React component consisting of table-row-like MUI controlled components 
 * @param {Object} props 
 * @param {string[][]} props.names The table form field names (map to row names)
 * @param {int[]} props.colConfig The column config for MUI grid items
 * @param {string[]} props.rowNames The row names
 * @param {Control} props.control The control object from useForm()
 * @param {Object} props.settings The settings corresponding to the form's mode e.g. "DRAFT"
 * @param {boolean} props.settings.enableInputs
 * @param {boolean} props.settings.loadForm
 * @param {boolean} props.settings.showComments
 * @param {boolean} props.settings.enableComments
 * @returns {React.Component}
 */
export const TableRowsStatic = ({ names, rowNames, ...rest }) => {
  return (
    <>
      {rowNames.map((rowName, idx) =>
        <TableRowStatic rowName={rowName} idx={idx} names={names[idx]} {...rest} />
      )}
    </>
  )
};

const TableRowDynamic = ({ settings, control, idx, names, colConfig, minRows=3, keys, rowMinHeight, rowNameAlign }) =>
  <>
    {names.map((name, j) =>
      <>
        <Grid item xs={colConfig[j]} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
          <Controller
            name={`${name.split('_')[0] + '_grouped'}.${idx}.${name}`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                id={`${name.split('_')[0] + '_grouped'}.${idx}.${name}`}
                fullWidth
                multiline
                minRows={minRows}
                disableUnderline='true'
                onChange={onChange}
                value={value}
                disabled={!settings.enableInputs}
                sx={{ padding: "8px" }}
              />
            )}
          />
        </Grid>
      </>
    )}
  </>


/**
 * Given a list of form array fields corr. to column names, return a React component consisting of table-row-like MUI controlled components that can be added/removed
 * @param {Object} props 
 * @param {string[]} props.names The table form field names (might map to row or column names)
 * @param {int[]} props.colConfig The column config for MUI grid items
 * @param {string[]} props.colNames The column names
 * @param {string[]=} props.rowNames The row names
 * @param {Control} props.control The control object from useForm()
 * @param {Object} props.settings The settings corresponding to the form's mode e.g. "DRAFT"
 * @param {boolean} props.settings.enableInputs
 * @param {boolean} props.settings.loadForm
 * @param {boolean} props.settings.showComments
 * @param {boolean} props.settings.enableComments
 * @returns {React.Component}
 */
// should have grouped all relevent fields into one object but oh well
// TODO look at slow renders to see if can improve performance
// TODO disable TableDeleteRow and TableAddRow in Review mode
export const TableRowsDynamic = (props) => {
  const { fields, append, remove } = useFieldArray({
    name: props.names[0].split('_')[0] + '_grouped',
    control: props.control,
    shouldUnregister: true
  });

  return (
    <>
      {fields.map((field, idx) =>
        <TableRowDynamic keys={field.id} idx={idx} {...props} />
      )}
      <TableDeleteRow onClickFunction={(e) => { remove(fields.length - 1); }} />
      <TableAddRow onClickFunction={(e) => { append(Object.fromEntries(props.names.map(k => [k, ""]))); }} />
    </>
  )
}