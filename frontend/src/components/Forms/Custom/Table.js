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
  FilledInput,
  OutlinedInput,
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

const TableDeleteRow = ({ onClickFunction, settings }) =>
  <>
    <Grid item alignItems='stretch' lg={12} md={12} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
      <Button
        id='delete-row'
        variant='outlined'
        color='error'
        display='flex'
        sx={{ fontSize: 28, height: '30px', width: '100%' }}
        onClick={onClickFunction}
        disabled={!settings.enableInputs}
      >
        -
      </Button>
    </Grid>
  </>

const TableAddRow = ({ onClickFunction, settings }) =>
  <>
    <Grid item alignItems='stretch' lg={12} md={12} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
      <Button
        id='add-row'
        variant='outlined'
        display='flex'
        sx={{ fontSize: 28, height: '30px', width: '100%' }}
        onClick={onClickFunction}
        disabled={!settings.enableInputs}
      >
        +
      </Button>
    </Grid>
  </>

const TableRowStatic = ({ settings, control, rowName, names, colConfig, minRows = 3, rowMinHeight, rowNameAlign }) =>
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
              key={`${name}`}
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

const TableRowDynamicTextInput = ({ name, field, settings, minRows = 3, required = false }) => {
  const [error, setError] = useState(false);
  return (
    <Box display="flex" maxWidth sx={{ height: "100%" }} alignItems="stretch">
      <OutlinedInput
        InputLabelProps={{
          required: required
        }}
        onChange={(e) => {
          field.onChange(e.target.value);
          (required && !e.target.value) ? setError(true) : setError(false);
        }}
        onFocus={() => { (required && !field.value) ? setError(true) : setError(false); }}
        error={error}
        id={name}
        key={name}
        fullWidth
        multiline
        minRows={minRows}
        value={field.value}
        disabled={!settings.enableInputs}
        sx={{ height: '100%' }} // TODO make error border a bit thicker
        display='flex'
      />
    </Box>
  )
}

const TableRowDynamicNumberInput = ({ name, field, settings, minRows = 3, required = false }) => {
  const [error, setError] = useState(false);
  return (
    <Box display="flex" maxWidth sx={{ height: "100%" }} alignItems="stretch">
      <OutlinedInput
        InputLabelProps={{
          required: required
        }}
        onChange={(e) => {
          field.onChange(parseInt(e.target.value));
          (required && !e.target.value) ? setError(true) : setError(false);
          (/[^0-9]/.test(e.target.value)) ? setError(true) : setError(false);
        }}
        onFocus={() => { (required && !field.value) ? setError(true) : setError(false); }}
        error={error}
        id={name}
        key={name}
        fullWidth
        multiline
        minRows={minRows}
        value={field.value}
        disabled={!settings.enableInputs}
        sx={{ height: '100%' }} // TODO make error border a bit thicker
        display='flex'
      />
    </Box>
  )
}

const TableRowDynamicFloatInput = ({ name, field, settings, minRows = 3, required = false }) => {
  const [error, setError] = useState(false);
  return (
    <Box display="flex" maxWidth sx={{ height: "100%" }} alignItems="stretch">
      <OutlinedInput
        InputLabelProps={{
          required: required
        }}
        onChange={(e) => {
          (required && !e.target.value) ? setError(true) : setError(false);
          (/([0-9]+[.])?[0-9]+/.test(e.target.value)) ? setError(true) : setError(false);
          field.onChange(parseFloat(e.target.value));
        }}
        onFocus={() => { (required && !field.value) ? setError(true) : setError(false); }}
        error={error}
        id={name}
        key={name}
        fullWidth
        multiline
        minRows={minRows}
        value={field.value}
        disabled={!settings.enableInputs}
        sx={{ height: '100%' }} // TODO make error border a bit thicker
        display='flex'
      />
    </Box>
  )
}

const TableRowDynamicDateInput = ({ name, field, settings, minRows = 3, required = false }) => {
  const [error, setError] = useState(false);
  return (
    <Box display="flex" maxWidth sx={{ height: "100%" }} alignItems="stretch">
      <TextField
        InputLabelProps={{
          required: required
        }}
        onChange={(e) => {
          field.onChange(e.target.value);
          (required && !e.target.value) ? setError(true) : setError(false);
          (!/^\d\d\/\d\d\/\d\d\d\d$/.test(e.target.value) || isNaN(Date.parse(e.target.value, "MM/DD/YYYY"))) ? setError(true) : setError(false);
        }}
        onFocus={() => {
          (required && !field.value) ? setError(true) : setError(false);
          (!/^\d\d\/\d\d\/\d\d\d\d$/.test(field.value) || isNaN(Date.parse(field.value, "MM/DD/YYYY"))) ? setError(true) : setError(false);
        }}
        error={error}
        id={name}
        key={name}
        fullWidth
        multiline
        minRows={minRows}
        value={field.value}
        placeholder="MM/DD/YYYY"
        disabled={!settings.enableInputs}
        sx={{ height: '100%' }} // TODO make error border a bit thicker
        display='flex'
      />
    </Box>
  )
}


const TableRowDynamicTimeInput = ({ name, field, settings, minRows = 3, required = false }) => {
  const [error, setError] = useState(false);
  return (
    <Box display="flex" maxWidth sx={{ height: "100%" }} alignItems="stretch">
      <OutlinedInput
        type="time"
        InputLabelProps={{
          required: required
        }}
        onChange={(e) => {
          field.onChange(e.target.value);
          (required && !e.target.value) ? setError(true) : setError(false);
          (!/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(e.target.value)) ? setError(true) : setError(false);
        }}
        onFocus={() => {
          (required && !field.value) ? setError(true) : setError(false);
          (!/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(field.value)) ? setError(true) : setError(false);
        }}
        error={error}
        id={name}
        key={name}
        fullWidth
        multiline
        minRows={minRows}
        value={field.value}
        placeholder="HH:mm"
        disabled={!settings.enableInputs}
        sx={{ height: '100%' }} // TODO make error border a bit thicker
        display='flex'
      />
    </Box>
  )
}

const TableRowDynamic = ({ settings, control, idx, names, colConfig, colTypes = [], minRows = 3, required = false }) => {
  const getInputComponent = (name, field, type) => {
    if (type == "number") {
      return <TableRowDynamicNumberInput name={`${name.split('_')[0] + '_grouped'}.${idx}.${name}`}
        field={field} settings={settings} minRows={minRows} required={required} />
    } else if (type == "float") {
      return <TableRowDynamicFloatInput name={`${name.split('_')[0] + '_grouped'}.${idx}.${name}`}
        field={field} settings={settings} minRows={minRows} required={required} />
    } else if (type == "date") {
      return <TableRowDynamicDateInput name={`${name.split('_')[0] + '_grouped'}.${idx}.${name}`}
        field={field} settings={settings} minRows={minRows} required={required} />
    } else if (type == "time") {
      return <TableRowDynamicTimeInput name={`${name.split('_')[0] + '_grouped'}.${idx}.${name}`}
        field={field} settings={settings} minRows={minRows} required={required} />
    } else {
      return <TableRowDynamicTextInput name={`${name.split('_')[0] + '_grouped'}.${idx}.${name}`}
        field={field} settings={settings} minRows={minRows} required={required} />
    };
  };
  return (
    <>
      {names.map((name, j) =>
        <>
          <Grid item xs={colConfig[j]} sx={{ border: '1px solid', borderColor: '#B9B9B9' }}>
            <Controller
              name={`${name.split('_')[0] + '_grouped'}.${idx}.${name}`}
              control={control}
              render={({ field }) => (
                getInputComponent(name, field, colTypes[j])
              )}
            />
          </Grid>
        </>
      )}
    </>
  )
}

/**
 * Given a list of form array fields corr. to column names, return a React component consisting of table-row-like MUI controlled components that can be added/removed
 * @param {Object} props 
 * @param {string[]} props.names The table form field names (might map to row or column names)
 * @param {int[]} props.colConfig The column config for MUI grid items
 * @param {string[]} props.colNames The column names
 * @param {string[]=} props.rowNames The row names
 * @param {int=} props.minRowsRequired The number of minimum rows required
 * @param {string[]=} props.colTypes Input types: "number", "date", "time" or "float"
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
export const TableRowsDynamic = (props) => {
  const { fields, append, remove } = useFieldArray({
    name: props.names[0].split('_')[0] + '_grouped',
    control: props.control,
    shouldUnregister: true
  });

  useEffect(() => {
    if (fields.length < props?.minRowsRequired) {
      for (let i = 0; i < props?.minRowsRequired; i++) {
        append(Object.fromEntries(props.names.map(k => [k, ""])));
      }
    }
  }, []);

  return (
    <>
      {fields.map((field, idx) => {
        return (idx < props?.minRowsRequired)
          ? <TableRowDynamic keys={field.id} idx={idx} required={true} {...props} />
          : <TableRowDynamic keys={field.id} idx={idx} {...props} />
      }
      )}
      <TableDeleteRow onClickFunction={(e) => { if (fields.length > props?.minRowsRequired) { remove(fields.length - 1) } }} {...props} />
      <TableAddRow onClickFunction={(e) => { append(Object.fromEntries(props.names.map(k => [k, ""]))); }} {...props} />
    </>
  )
}