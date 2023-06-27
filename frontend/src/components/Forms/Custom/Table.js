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

// const tableSettingsC1 = {
//   names: ['C1_date', 'C1_time', 'C1_activity_and_description', 'C1_venue'],
//   colConfig: [3, 2, 4, 3],
//   colNames: ['Date', 'Time', 'Activity and Description', 'Venue']
// }

const TableTextField = ({ settings, control, name, idx, key, minRows = 3 }) => {
  return (
    <Controller
      name={`${name.split('_')[0]+'_grouped'}.${idx}.${name}`}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Input
          key={key}
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
  );
};


const TableRow = ({ settings, control, rowName, idx, names, colConfig, rowMinHeight, rowNameAlign }) =>
  <>
    <Grid item display="flex" xs={colConfig[0]} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
      <TableRowName rowName={rowName} />
    </Grid>
    {names.map((name, j) =>
      <Grid item xs={colConfig[j + 1]} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
        <TableTextField name={name} idx={idx} control={control} settings={settings} />
      </Grid>
    )}
  </>

const TableRowNoName = ({ settings, control, idx, names, colConfig, keys, rowMinHeight, rowNameAlign }) =>
  <>
    {names.map((name, j) =>
      <>
        <Grid item xs={colConfig[j]} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
          <TableTextField name={name} idx={idx} control={control} settings={settings} key={keys[j]} />
        </Grid>
      </>
    )}
  </>


/**
 * Given a list of form fields, return a React component consisting of table-row-like MUI controlled components 
 * @param {Object} props 
 * @param {string[][]} props.names The table form field names (map to row names)
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
export const TableRowsStatic = ({ names, rowNames, ...rest }) => {
  return (
    <>
      {rowNames.map((rowName, idx) =>
        <TableRow rowName={rowName} idx={idx} names={names[idx]} {...rest} />
      )}
    </>
  )
};

/**
 * Given a list of form array fields, return a React component consisting of table-row-like MUI controlled components that can be added/removed
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
export const TableRowsDynamic = (props) => {
  const { fields, append, remove } = useFieldArray({ 
    name: props.names[0].split('_')[0]+'_grouped',
    control: props.control, 
    shouldUnregister: true
  });

  return (
    <>
      {fields.map((field, idx) =>
        <TableRowNoName keys={field.id} idx={idx} {...props} />
      )}
      <TableDeleteRow onClickFunction={(e) => { remove(fields.length-1); }} />
      <TableAddRow onClickFunction={(e) => { append(Object.fromEntries(props.names.map(k => [k, ""]))); }} />
    </>
  )
}