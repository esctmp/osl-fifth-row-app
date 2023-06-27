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

export const TableRowName = ({ rowName, rowNameAlign = '', sx = {} }) =>
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

// const tableSettingsC1 = {
//   names: ['C1_date', 'C1_time', 'C1_activity_and_description', 'C1_venue'],
//   colConfig: [3, 2, 4, 3],
//   colNames: ['Date', 'Time', 'Activity and Description', 'Venue']
// }

const TableTextField = ({ settings, control, name, idx, minRows = 3 }) => {
  return (
    <Controller
      name={`${name}.${idx}`}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Input
          id={`${name}.${idx}`}
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

const TableRowNoName = ({ settings, control, idx, names, colConfig, rowMinHeight, rowNameAlign }) =>
  <>
    {names.map((name, j) =>
      <>
        <Grid item xs={colConfig[j]} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
          <TableTextField name={name} idx={idx} control={control} settings={settings} />
        </Grid>
      </>
    )}
  </>

function FieldArrayWrapper(name, control) {
  const { fields, append, remove, reaplce, update } = useFieldArray({ control, name });
  this.fields = fields;
  this.append = append;
  this.remove = remove;
  this.update = remove;
  this.replace = remove;

  // function appendValue() { append(""); }
  // function removeValue() { remove(fields.length-1); }
  // function getLength() { return fields.length; }
}

/**
 * Given a list of table form field names, return a React component consisting of table-row-like MUI controlled components 
 * @param {Object} props 
 * @param {string[]} props.names The table form field names (might map to row or column names)
 * @param {int[]} props.colConfig The column config for MUI grid items
 * @param {string[]} props.colNames The column names
 * @param {string[]=} props.rowNames The column names
 * @param {Control} props.control The control object from useForm()
 * @param {Object} props.settings The settings corresponding to the form's mode e.g. "DRAFT"
 * @param {boolean} props.settings.enableInputs
 * @param {boolean} props.settings.loadForm
 * @param {boolean} props.settings.showComments
 * @param {boolean} props.settings.enableComments
 * @returns {React.Component}
 */
// should have grouped all relevent fields into one object but oh well
export const TableRowsDynamicTesting = (props) => {
  const arr = props.names.map(name => new FieldArrayWrapper(name, props.control));
  const initialNumRows = arr[0].fields.length || 1;
  const [ numRows, setNumRows ] = useState(initialNumRows);

  function appendRow(e) {
    setNumRows(numRows + 1);
    arr.forEach(obj => obj.append(""));
  };

  function removeLastRow(e) {
    setNumRows(numRows > 0 ? numRows - 1 : numRows);
    arr.forEach(obj => obj.remove(obj.fields.length-1));
    console.log(arr[0]);
  }

  return (
    <>
      {[...Array(numRows).keys()].map(idx =>
        <TableRowNoName key={idx} idx={idx} {...props} />
      )}
      <TableDeleteRow onClickFunction={removeLastRow} />
      <TableAddRow onClickFunction={appendRow} />
    </>
  )
}